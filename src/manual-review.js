function manualReviewBar(load,doc) {
  const review=doc.manualReview;
  return `<div class="manual-review-bar"><div><strong>${review?(doc.reviewed?'Human review recorded':'Review still incomplete'):'This file needs your review'}</strong><p>${review?e(review.reviewer)+' · '+formatTime(review.at):'Classify the document and check its contents against load '+e(load.id)+'.'}</p></div>${button(review?'Edit review':'Review document','review-file','secondary small','eye')}</div>`;
}

function manualReviewModal() {
  const load=currentLoad(),doc=load.docs.find(item=>item.id===selectedDoc&&!item.superseded);
  if(!doc?.data) throw new Error('Select an uploaded document first.');
  const prior=doc.manualReview;
  const choice=(id,label,value)=>`<label class="field"><span>${label}</span><select id="${id}"><option value="">Choose an answer</option><option value="yes" ${value===true?'selected':''}>Yes</option><option value="no" ${value===false?'selected':''}>No / cannot verify</option></select></label>`;
  openModal('Manual document review','Record what you can verify.',
    `<div class="review-file-name">${icon('file')}<span>${e(doc.name)}</span></div>
    <p>Check the original file before saving. These findings are recorded by you; no AI analysis is performed.</p>
    <div class="form-columns">
      <label class="field"><span>Document type</span><select id="manual-type"><option value="">Choose a type</option>${['pod','rate','invoice'].map(type=>`<option value="${type}" ${doc.type===type?'selected':''}>${TYPE_NAMES[type]}</option>`).join('')}</select></label>
      <label class="field"><span>Reference printed on the document</span><input id="manual-reference" maxlength="40" value="${e(doc.reference||'')}" placeholder="Leave blank if absent or unreadable" autocomplete="off"><small>Expected load: ${e(load.id)}. Enter what the file actually shows.</small></label>
    </div>
    <div class="form-columns">${choice('manual-readable','Is the document readable?',prior?doc.readable:null)}${choice('manual-complete','Are all required pages and fields visible?',prior?doc.complete:null)}</div>
    <div id="manual-signature-field">${choice('manual-signature','Is the receiving signature visible?',prior?doc.signature:null)}</div>
    <label class="field"><span>Damage, shortage, or other delivery notation?</span><select id="manual-notation"><option value="">Choose an answer</option><option value="no" ${prior?.notationResult==='no'?'selected':''}>No notation found</option><option value="yes" ${prior?.notationResult==='yes'?'selected':''}>Yes, a notation is present</option><option value="unknown" ${prior?.notationResult==='unknown'?'selected':''}>Cannot determine from this file</option></select><small>An uncertain finding keeps the file on hold. A new review cannot clear an earlier exception.</small></label>
    <label class="field"><span>Does this replace an earlier document?</span><select id="manual-replaces"></select><small>Only choose a replacement after confirming the same document type and load. Earlier evidence is retained.</small></label>
    <label class="field"><span>Your name</span><input id="manual-reviewer" maxlength="80" value="${e(prior?.reviewer||'')}" autocomplete="name"><small>Saved as a local reviewer name, without identity verification.</small></label>
    <label class="field"><span>Review note <span class="muted">(optional)</span></span><textarea id="manual-note" maxlength="2000" placeholder="Describe anything the next reviewer should know.">${e(prior?.note||'')}</textarea></label>
    <label class="review-attestation"><input id="manual-inspected" type="checkbox"><span>I inspected the original document, including all provided pages.</span></label>
    <p class="fine">This records an evidence review. It does not approve billing or verify delivery.</p>`,
    button('Cancel','close','secondary')+button('Save document review','save-file-review','primary','check'),{id:load.id,docId:doc.id,type:'manual-review'});
  updateManualReviewFields();
}

function updateManualReviewFields() {
  if(modalContext?.type!=='manual-review') return;
  const type=$('#manual-type').value,load=getLoad(modalContext.id);
  $('#manual-signature-field').hidden=type!=='pod';
  $('#manual-signature').disabled=type!=='pod';
  $('#manual-replaces').innerHTML='<option value="">Keep all current evidence</option>'+load.docs.filter(doc=>doc.id!==modalContext.docId&&!doc.superseded&&doc.type===type).map(doc=>`<option value="${e(doc.id)}">${e(doc.name)}</option>`).join('');
}

function saveManualReview() {
  const load=getLoad(modalContext.id),docId=modalContext.docId,type=$('#manual-type').value;
  const answer=id=>{const value=$(id).value;return value==='yes'?true:value==='no'?false:null;};
  const next=reviewDocument(load,docId,{type,reference:$('#manual-reference').value,reviewer:$('#manual-reviewer').value,
    readable:answer('#manual-readable'),complete:answer('#manual-complete'),signature:type==='pod'?answer('#manual-signature'):false,
    notation:$('#manual-notation').value,note:$('#manual-note').value,replaces:$('#manual-replaces').value,inspected:$('#manual-inspected').checked});
  selectedDoc=docId;
  updateLoad(next);
  closeModal();
  toast(assess(next).ready?'Review saved. The packet is ready for billing review.':'Review saved. Unresolved items remain on hold.');
}
