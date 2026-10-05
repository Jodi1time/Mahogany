/** Pure domain rules. Demo metadata is not OCR, signature verification, or billing approval. */
const VERSION = 1;
const TYPE_NAMES = {pod:'Signed proof of delivery',rate:'Rate confirmation',invoice:'Carrier invoice',unclassified:'Unclassified document'};
const STATUS = {
 attention: {label:'Needs paperwork',short:'Paperwork',tone:'amber'},
 waiting: {label:'Awaiting evidence',short:'Awaiting evidence',tone:'neutral'},
 review: {label:'Needs human review',short:'Human review',tone:'rose'},
 incomplete: {label:'Assessment incomplete',short:'Source unavailable',tone:'neutral'},
 ready: {label:'Ready for review',short:'Ready for review',tone:'green'}
};
const copy = value => JSON.parse(JSON.stringify(value));
function assess(load) {
  const blockers=[]; const checks=[];
  const sourcesOK=load.sources.length>0&&load.sources.every(s=>s.state==='checked');
  checks.push({id:'sources',label:'Approved sources checked',state:sourcesOK?'pass':'unknown',detail:sourcesOK?'Both sample sources were checked.':'A required source has not been checked successfully.'});
  if(!sourcesOK) blockers.push({id:'source',kind:'source',title:'A source could not be checked',detail:'The document mailbox is unavailable or unassessed. We cannot conclude that a document is missing.',action:'Check the source before requesting paperwork.'});
  const active=load.docs.filter(d=>!d.superseded);
  for(const kind of load.required) {
    const candidates=active.filter(d=>d.type===kind);
    const matched=candidates.filter(d=>d.match&&d.reviewed&&d.reference===load.id);
    if(!candidates.length) {
      checks.push({id:kind,label:TYPE_NAMES[kind],state:sourcesOK?'fail':'unknown',detail:sourcesOK?'Not found in the checked sample sources.':'Presence is unknown until all required sources are checked.'});
      if(sourcesOK) blockers.push({id:'missing-'+kind,kind:'missing',title:TYPE_NAMES[kind]+' is missing',detail:'No usable '+TYPE_NAMES[kind].toLowerCase()+' was found in the checked sources.',action:'Request the missing document.'});
      continue;
    }
    if(!matched.length) {
      checks.push({id:kind,label:TYPE_NAMES[kind],state:'review',detail:'The attachment is not confidently matched to this load.'});
      blockers.push({id:'match-'+kind,kind:'match',title:'The load reference does not match',detail:'The '+TYPE_NAMES[kind].toLowerCase()+' shows reference '+(candidates[0].reference||'unknown')+', not a confirmed match to '+load.id+'.',action:'Keep this attachment on hold for a person to review.'});
      continue;
    }
    const usable=matched.find(d=>d.readable&&d.complete&&(kind!=='pod'||d.signature));
    if(!usable) {
      const d=matched[0];
      const title=!d.complete?(kind==='pod'?'The signature area is cropped':'A page is incomplete'):!d.readable?'The document is unreadable':'The receiving signature is not visible';
      checks.push({id:kind,label:TYPE_NAMES[kind],state:'fail',detail:title+'.'});
      blockers.push({id:'quality-'+kind,kind:'quality',title,detail:'The '+TYPE_NAMES[kind].toLowerCase()+' appears to belong to this load, but its required information is not fully visible.',action:'Request a clear, full-page copy.'});
    } else checks.push({id:kind,label:TYPE_NAMES[kind],state:'pass',detail:'Sample metadata indicates a matching, readable, complete document.'});
  }
  const unknown=active.filter(d=>!d.reviewed||d.type==='unclassified');
  const unmatched=active.filter(d=>d.reviewed&&d.type!=='unclassified'&&(!d.match||d.reference!==load.id));
  if(unmatched.length&&!blockers.some(b=>b.kind==='match')) blockers.push({id:'additional-match',kind:'match',title:'An extra attachment has an unconfirmed load reference',detail:'A matching document does not resolve a separate mismatched attachment.',action:'Inspect and reconcile every attachment before handing off this packet.'});
  if(unknown.length) blockers.push({id:'manual',kind:'manual',title:'An added file needs manual assessment',detail:'No live extraction or document assessment is connected. '+unknown.length+' file(s) remain unreviewed.',action:'A qualified employee must inspect and classify the file.'});
  const exception=load.exceptionHold||active.some(d=>d.notation);
  checks.push({id:'exceptions',label:'Delivery notation check',state:exception?'review':'pass',detail:exception?'A delivery exception remains on hold for human judgment.':'No exception notation is flagged in the sample evidence.'});
  if(exception) blockers.push({id:'exception',kind:'exception',title:'A damage notation needs review',detail:'The sample POD notes damaged cartons. Replacing the file does not resolve this commercial exception.',action:'Escalate to the billing or claims lead. Do not clear automatically.'});
  const state=!sourcesOK?'incomplete':blockers.some(b=>['match','exception','manual'].includes(b.kind))?'review':blockers.length?(load.pendingRequest?'waiting':'attention'):'ready';
  const done=load.required.filter(type=>checks.find(c=>c.id===type)?.state==='pass').length;
  return {state,blockers,checks,done,total:load.required.length,sourcesOK,ready:state==='ready'};
}
function event(load,text,type='note',actor='You',at=new Date().toISOString()) {
  load.events.push({id:globalThis.crypto?.randomUUID?.()||('e-'+Date.now()+'-'+Math.random().toString(36).slice(2)),at,actor,type,text});
}
function followupDraft(load) {
  const a=assess(load);
  const items=a.blockers.filter(b=>['missing','quality'].includes(b.kind));
  let request=items.map(b=>b.kind==='quality'?'a clear, full-page copy of the signed proof of delivery, including the receiving-signature area':b.title.replace(' is missing','').toLowerCase()).join('; and ');
  return {subject:`Load ${load.id} · delivery paperwork`,body:`Hi ${load.carrier} team,\n\nWe are preparing the paperwork for load ${load.id} (${load.origin} to ${load.destination}).\n\nPlease reply with ${request||'the outstanding paperwork for this load'}.\n\nWe have checked the available shipment record and document mailbox before making this request.\n\nThank you,\nNorthline Billing`};
}
function canRequest(load) {
  const a=assess(load);
  return a.sourcesOK&&!load.pendingRequest&&!a.ready&&!a.blockers.some(b=>['match','exception','manual'].includes(b.kind));
}
function approveDraft(load,draft) {
  if(!canRequest(load)) throw new Error(load.pendingRequest?'A request for this evidence is already pending.':'Resolve the source or review issues before approving a follow-up.');
  if(!draft.subject?.trim()||!draft.body?.trim()) throw new Error('Add both a subject and a message.');
  if(draft.body.length>5000) throw new Error('Keep the message under 5,000 characters.');
  const next=copy(load);
  next.draft={subject:draft.subject.trim(),body:draft.body.trim()};
  next.pendingRequest={...next.draft,at:new Date().toISOString(),sent:false,demo:true};
  event(next,'Follow-up approved in the demo. No message was sent to a carrier.','approval');
  return next;
}
function receiveSample(load,kind,replacements) {
  const next=copy(load);
  if(kind==='promise') {
    event(next,'“I’ll send it shortly.” No attachment received; the paperwork remains unresolved.','reply','Simulated carrier');
    return next;
  }
  if(!replacements?.length) throw new Error('No seeded replacement documents exist for this imported load.');
  const incoming=kind==='packet'?replacements:replacements.filter(d=>d.type==='pod');
  const types=incoming.map(d=>d.type);
  next.docs.forEach(d=>{if(types.includes(d.type))d.superseded=true;});
  for(const doc of incoming) next.docs.push({...copy(doc),id:doc.id+'-'+Date.now(),receivedAt:new Date().toISOString()});
  // Holds are sticky: a new clean page cannot erase an earlier exception.
  next.exceptionHold=next.exceptionHold||load.docs.some(d=>d.notation);
  event(next,kind==='packet'?'Complete replacement sample packet received. Earlier evidence retained.':'A clear, signed sample POD was received. Earlier evidence retained.','document','Simulated carrier');
  const a=assess(next);
  if(a.ready) next.pendingRequest=null;
  event(next,a.ready?'Configured sample requirements appear satisfied. Ready for a person to review; billing is not approved.':`${a.blockers.length} unresolved item(s) remain after reassessment.`,'assess','MAHOGANY demo rules');
  return next;
}
function restoreSampleSource(load) {
  const next=copy(load);next.sources=next.sources.map(s=>({...s,state:'checked',checkedAt:new Date().toISOString()}));
  event(next,'Source access restored in the simulation. Sample sources checked again.','source','Simulated source');
  return next;
}
function packetManifest(load) {
  const a=assess(load);
  if(!a.ready) throw new Error('This load still has unresolved paperwork. A review packet cannot be exported.');
  return {product:'MAHOGANY',version:VERSION,demo:true,state:'ready_for_billing_review',billingApproved:false,disclaimer:'Fictional demo evidence. Not for billing, payment, claims, or operational use. Readiness comes from seeded metadata, not live OCR or AI.',generatedAt:new Date().toISOString(),load:{id:load.id,customer:load.customer,carrier:load.carrier,origin:load.origin,destination:load.destination,recordedDeliveredAt:load.deliveredAt,deliveryStatusSource:load.deliverySource},checklist:a.checks,sources:load.sources,documents:load.docs.map(d=>({id:d.id,name:d.name,type:d.type,reference:d.reference,source:d.source,receivedAt:d.receivedAt,superseded:d.superseded})),history:load.events};
}
function parseCSV(text) {
  if(text.length>1_000_000) throw new Error('Use a CSV smaller than 1 MB.');
  text=text.replace(/^\uFEFF/,'');let rows=[],row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(field);field='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(x=>x.trim()))rows.push(row);row=[];field='';}
    else field+=c;
  }
  if(quoted)throw new Error('A quoted field is not closed.');
  row.push(field);if(row.some(x=>x.trim()))rows.push(row);
  if(rows.length<2)throw new Error('Include a header and at least one delivered load.');
  if(rows.length>201)throw new Error('Import at most 200 sample loads at a time.');
  const header=rows.shift().map(x=>x.trim().toLowerCase());
  const expected=['load_id','customer','carrier','origin','destination','delivered_at'];
  if(!expected.every(x=>header.includes(x)))throw new Error('Required columns: '+expected.join(', '));
  const seen=new Set();
  return rows.map((r,i)=>{
    const get=k=>(r[header.indexOf(k)]||'').trim();const id=get('load_id');
    if(!/^[A-Za-z0-9_-]{1,40}$/.test(id))throw new Error(`Row ${i+2}: load_id must be 1–40 letters, digits, hyphens, or underscores.`);
    if(seen.has(id))throw new Error(`Duplicate load ${id} in the CSV.`);seen.add(id);
    for(const k of expected)if(!get(k)||get(k).length>200)throw new Error(`Row ${i+2}: provide a valid ${k}.`);
    const delivered=get('delivered_at');
    if(!/(Z|[+-]\d\d:\d\d)$/.test(delivered)||isNaN(Date.parse(delivered)))throw new Error(`Row ${i+2}: delivered_at must be an ISO timestamp with a timezone, such as 2026-10-03T16:00:00Z.`);
    return {id,customer:get('customer'),carrier:get('carrier'),email:'dispatch@carrier.example',origin:get('origin'),destination:get('destination'),deliveredAt:delivered,importedAt:new Date().toISOString(),deliverySource:'User-imported sample CSV; not independently verified',docs:[],sources:[{name:'Sample CSV',state:'checked',checkedAt:new Date().toISOString()},{name:'Document source',state:'unavailable',checkedAt:null}],required:['pod','rate','invoice'],exceptionHold:false,pendingRequest:null,draft:null,notes:[],events:[{id:'import-'+id,at:new Date().toISOString(),actor:'You',type:'import',text:'Sample CSV imported. Document assessment is incomplete; no live sources were accessed.'}]};
  });
}
function isValidState(state) {
  const text = value => typeof value === 'string';
  const date = value => text(value) && Number.isFinite(Date.parse(value));
  const optionalDraft = value => value === null || (value && text(value.subject) && text(value.body));
  if (!state || state.version !== VERSION || !Array.isArray(state.loads) || state.loads.length > 208) return false;
  const ids = new Set();
  return state.loads.every(load => {
    if (!load || !text(load.id) || !/^[A-Za-z0-9_-]{1,40}$/.test(load.id) || ids.has(load.id)) return false;
    ids.add(load.id);
    return ['customer','carrier','email','origin','destination','deliverySource'].every(key => text(load[key])) &&
      date(load.deliveredAt) && date(load.importedAt) && typeof load.exceptionHold === 'boolean' &&
      Array.isArray(load.required) && load.required.length > 0 &&
      new Set(load.required).size === load.required.length && load.required.every(type => ['pod','rate','invoice'].includes(type)) &&
      Array.isArray(load.docs) && load.docs.every(doc => doc && text(doc.id) && text(doc.name) &&
        ['pod','rate','invoice','unclassified'].includes(doc.type) &&
        ['match','readable','complete','signature','notation','superseded','reviewed'].every(key => typeof doc[key] === 'boolean') &&
        (doc.reference === null || text(doc.reference)) && text(doc.source) && date(doc.receivedAt) &&
        (doc.data === undefined || (text(doc.data) && /^data:(application\/pdf|image\/png|image\/jpeg);base64,/.test(doc.data)))) &&
      Array.isArray(load.sources) && load.sources.length > 0 && load.sources.every(source => source &&
        text(source.name) && ['checked','unavailable'].includes(source.state) &&
        (source.checkedAt === null || date(source.checkedAt))) &&
      Array.isArray(load.events) && load.events.every(item => item && text(item.id) && text(item.actor) && text(item.type) && text(item.text) && date(item.at)) &&
      Array.isArray(load.notes) && load.notes.every(note => note && text(note.text) && date(note.at)) &&
      optionalDraft(load.draft) && optionalDraft(load.pendingRequest);
  });
}
