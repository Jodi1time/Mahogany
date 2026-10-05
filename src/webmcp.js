// Progressive enhancement: tools inspect the same sample records as the UI.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
  const register = tool => {
    try {
      Promise.resolve(document.modelContext.registerTool(tool, { signal: lifecycle.signal }))
        .catch(() => {});
    } catch { /* The workspace remains usable without this optional API. */ }
  };
  register({
    name: 'list_load_assessments',
    title: 'List paperwork assessments',
    description: 'Read sample loads and paperwork blockers. Findings use seeded metadata, not live AI or OCR.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length)
        throw new Error('Provide an empty object.');
      return { demo: true, loads: state.loads.map(load => {
        const assessment = assess(load);
        return { id: load.id, customer: load.customer, status: assessment.state,
          blockers: assessment.blockers.map(item => item.title), billingApproved: false };
      }) };
    }
  });
  register({
    name: 'open_load_review',
    title: 'Open a load for review',
    description: 'Navigate to a sample load and its evidence. This does not approve, send, or modify records.',
    inputSchema: { type: 'object', properties: { loadId: { type: 'string' } }, required: ['loadId'], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: true },
    execute(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input) ||
          Object.keys(input).some(key => key !== 'loadId') || typeof input.loadId !== 'string')
        throw new Error('Provide a loadId string.');
      const load = getLoad(input.loadId);
      if (!load) throw new Error('Load not found.');
      history.replaceState(null, '', '#/load/' + encodeURIComponent(load.id));
      closeModal();
      readRoute();
      return { opened: load.id, status: assess(load).state, demo: true, billingApproved: false };
    }
  });
}
