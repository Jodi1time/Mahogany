# Mahogany

A focused workspace for the paperwork that holds up billing after a freight load is delivered.

The working preview includes a searchable queue, original sample documents, evidence checklists, editable follow-up drafts, review notes, activity history, sample CSV imports, local file attachments, manual document classification and review, and downloadable review packets. The design carries forward the original Mahogany prototype with larger type and more usable mobile controls.

## Run

Requires Node 20 or later. No package installation is required.

```sh
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. `dist/index.html` also works as a self-contained file. Edit `src/`, then build to regenerate it. `src/domain.js` owns the assessment rules; `src/fixtures.js` and `src/assets.js` hold fictional records and documents. There are no runtime dependencies or third-party asset requests.

## Walk through the workflow

1. Open load 1042 and inspect the cropped proof of delivery.
2. Review the follow-up and record a demo approval. No email is sent.
3. Add a sample response with a promise but no attachment. The load stays unresolved.
4. Add the clear signed POD. The packet becomes ready for a person's review.
5. Export the documents, checklist, and audit trail.

Load 1046 demonstrates a sticky damage hold. Load 1048 demonstrates an unavailable source: an unavailable mailbox does not prove a document is missing. An arbitrary attached file remains unassessed until a person inspects it and records its type, reference, completeness, legibility, signature, and delivery notation. A reviewed replacement must match the load and pass quality checks before it can supersede a selected earlier document. Original evidence, prior review values, and commercial holds are retained. Reviewer names are self-reported; they are not authenticated identities.

## Current boundaries

This version uses fictional sample data. OCR, AI extraction, mailbox access, TMS connections, outbound messages, and billing submissions are not connected. Assessment uses seeded document metadata or explicitly recorded human reviews. Uploaded documents remain on hold when the notation check is uncertain. Manual review does not bypass an unavailable source or grant billing approval. Records and uploaded samples are stored only in the current browser; this is not shared storage or a security boundary for business data. Use fictional or redacted samples only.

Ready for review never means billing is approved. The next production milestone is one authorized source workflow with verified customer/load matching, document extraction, a shared audit trail, and human review.
