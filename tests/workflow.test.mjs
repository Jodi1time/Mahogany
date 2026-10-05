import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const root = new URL('../', import.meta.url);
const source = ['fixtures','domain','files'].map(name => readFileSync(new URL(`src/${name}.js`, root), 'utf8')).join('\n');
const domain = runInNewContext(source + '\n;({SEED,REPLACEMENTS,VERSION,copy,assess,canRequest,followupDraft,approveDraft,receiveSample,restoreSampleSource,packetManifest,parseCSV,isValidState,escapeHTML,makeZip,reviewDocument});', { Blob, TextEncoder });
const load = id => domain.copy(domain.SEED.find(item => item.id === id));

test('seed records remain valid and yield the expected eight-load queue', () => {
  assert.equal(domain.SEED.length, 8);
  assert.ok(domain.isValidState({ version: domain.VERSION, loads: domain.SEED }));
  const states = domain.SEED.map(item => domain.assess(item).state);
  assert.equal(states.filter(state => state === 'ready').length, 2);
  assert.equal(domain.assess(load('1048')).state, 'incomplete');
});
test('the full follow-up loop needs evidence and never grants billing approval', () => {
  const original = load('1042');
  assert.equal(domain.assess(original).ready, false);
  const approved = domain.approveDraft(original, domain.followupDraft(original));
  assert.equal(approved.pendingRequest.sent, false);
  assert.equal(domain.assess(approved).state, 'waiting');
  assert.throws(() => domain.approveDraft(approved, domain.followupDraft(approved)), /already pending/);
  const promise = domain.receiveSample(approved, 'promise', domain.REPLACEMENTS['1042']);
  assert.equal(domain.assess(promise).ready, false);
  const resolved = domain.receiveSample(promise, 'pod', domain.REPLACEMENTS['1042']);
  assert.equal(domain.assess(resolved).ready, true);
  assert.equal(domain.packetManifest(resolved).billingApproved, false);
  assert.ok(resolved.docs.some(doc => doc.superseded));
  assert.equal(original.pendingRequest, null);
});
test('a clean replacement cannot clear a commercial exception', () => {
  const next = domain.receiveSample(load('1046'), 'packet', domain.REPLACEMENTS['1046']);
  assert.equal(domain.assess(next).state, 'review');
  assert.equal(domain.canRequest(next), false);
  assert.throws(() => domain.packetManifest(next), /unresolved/);
});
test('unavailable sources prevent follow-up and become ready only after a source check', () => {
  const item = load('1048');
  assert.equal(domain.canRequest(item), false);
  assert.throws(() => domain.approveDraft(item, domain.followupDraft(item)), /source or review/);
  assert.equal(domain.assess(domain.restoreSampleSource(item)).ready, true);
});
test('a claimed match with another reference cannot pass and extra mismatches hold the packet', () => {
  const item = load('1049');
  item.docs[0].reference = 'OTHER';
  assert.equal(domain.assess(item).ready, false);
  const additional = load('1049');
  additional.docs.push({ ...additional.docs[0], id: 'unmatched', reference: 'OTHER', match: false });
  assert.equal(domain.assess(additional).state, 'review');
});
test('unassessed local files block an otherwise complete packet', () => {
  const item = load('1049');
  item.docs.push({ ...item.docs[0], id: 'local-file', type: 'unclassified', reviewed: false });
  assert.equal(domain.assess(item).state, 'review');
});
test('CSV imports support quoted routes, reject duplicates and require timezone', () => {
  const header = 'load_id,customer,carrier,origin,destination,delivered_at\n';
  const row = '1050,Sample,Carrier,"Dallas, TX","Austin, TX",2026-10-04T16:00:00Z';
  const [imported] = domain.parseCSV(header + row);
  assert.equal(imported.origin, 'Dallas, TX');
  assert.equal(domain.assess(imported).state, 'incomplete');
  assert.throws(() => domain.parseCSV(header + row + '\n' + row), /Duplicate/);
  assert.throws(() => domain.parseCSV(header + row.replace('00Z', '00')), /timezone/);
});
test('corrupt storage is rejected before it can break the workspace', () => {
  for (const change of [item => item.docs.push(null), item => item.notes = null,
    item => item.required = [], item => item.sources[0] = null, item => item.deliveredAt = 'invalid']) {
    const item = load('1042'); change(item);
    assert.equal(domain.isValidState({ version: domain.VERSION, loads: [item] }), false);
  }
  assert.equal(domain.isValidState({ version: domain.VERSION, loads: [load('1042'), load('1042')] }), false);
});
test('user-controlled labels are escaped and ZIP exports have valid headers', async () => {
  assert.equal(domain.escapeHTML('<img src=x onerror="x">'), '&lt;img src=x onerror=&quot;x&quot;&gt;');
  const zip = domain.makeZip([{ name: 'review.txt', data: 'Evidence for human review' }]);
  const data = new DataView(await zip.arrayBuffer());
  assert.equal(data.getUint32(0, true), 0x04034b50);
  assert.equal(data.getUint32(data.byteLength - 22, true), 0x06054b50);
});

const withUpload = id => {
  const item=load(id);
  item.docs.push({id:'uploaded',name:'sample-proof.pdf',type:'unclassified',asset:null,data:'data:application/pdf;base64,JVBERi0=',reference:null,match:false,readable:false,complete:false,signature:false,notation:false,receivedAt:'2026-10-05T07:00:00Z',source:'Local sample upload',superseded:false,reviewed:false});
  return item;
};
const review = id => ({type:'pod',reference:id,reviewer:'Test reviewer',readable:true,complete:true,signature:true,notation:'no',note:'Inspected all provided pages.',replaces:'',inspected:true});

test('manual classification clears the upload hold and exports review provenance', () => {
  const original=withUpload('1042');
  const next=domain.reviewDocument(original,'uploaded',{...review('1042'),replaces:'1042-pod-cropped'});
  assert.equal(domain.assess(next).ready,true);
  assert.equal(next.docs.find(item=>item.id==='1042-pod-cropped').superseded,true);
  assert.equal(original.docs.find(item=>item.id==='1042-pod-cropped').superseded,false);
  const manifest=domain.packetManifest(next),doc=manifest.documents.find(item=>item.id==='uploaded');
  assert.equal(doc.assessmentMethod,'manual');
  assert.equal(doc.manualReview.reviewer,'Test reviewer');
  assert.equal(doc.manualReview.identityVerified,false);
  assert.equal(manifest.billingApproved,false);
  assert.equal(next.events.at(-1).documentReview.before.type,'unclassified');
  assert.ok(domain.isValidState({version:domain.VERSION,loads:[next]}));
});
test('manual review refuses uninspected files and cannot supersede with a wrong-load file', () => {
  const original=withUpload('1042'),before=JSON.stringify(original);
  assert.throws(()=>domain.reviewDocument(original,'uploaded',{...review('1042'),inspected:false}),/Inspect/);
  assert.throws(()=>domain.reviewDocument(original,'uploaded',{...review('WRONG'),replaces:'1042-pod-cropped'}),/match this load/);
  assert.throws(()=>domain.reviewDocument(original,'uploaded',{...review('1042'),replaces:'1042-rate'}),/same type/);
  assert.equal(JSON.stringify(original),before);
  assert.equal(domain.assess(domain.reviewDocument(original,'uploaded',review('WRONG'))).state,'review');
});
test('uncertain notation stays unresolved and prior damage remains held after edits', () => {
  let next=domain.reviewDocument(withUpload('1049'),'uploaded',{...review('1049'),notation:'unknown'});
  assert.equal(domain.assess(next).state,'review');
  next=domain.reviewDocument(next,'uploaded',{...review('1049'),notation:'yes'});
  assert.equal(next.exceptionHold,true);
  next=domain.reviewDocument(next,'uploaded',review('1049'));
  assert.equal(domain.assess(next).state,'review');
  assert.equal(next.events.at(-1).documentReview.before.notation,true);
});
test('manual review cannot bypass a source gap or unreadable evidence', () => {
  const incomplete=domain.reviewDocument(withUpload('1048'),'uploaded',review('1048'));
  assert.equal(domain.assess(incomplete).state,'incomplete');
  const original=withUpload('1042');
  original.docs=original.docs.filter(doc=>doc.type!=='pod');
  const bad=domain.reviewDocument(original,'uploaded',{...review('1042'),readable:false});
  assert.equal(domain.assess(bad).ready,false);
});
test('invoice-quality follow-ups ask for an invoice, not a proof of delivery', () => {
  const item=load('1049');item.docs.find(doc=>doc.type==='invoice').readable=false;
  const draft=domain.followupDraft(item);
  assert.match(draft.body,/clear, complete copy of the carrier invoice/);
  assert.doesNotMatch(draft.body,/receiving-signature/);
});
