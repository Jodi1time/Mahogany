const SEED = [
  {
    "id": "1042",
    "customer": "Hearth & Home",
    "carrier": "Redwood Transport",
    "email": "redwood@carrier.example",
    "origin": "Dallas, TX",
    "destination": "Austin, TX",
    "deliveredAt": "2026-10-03T15:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1042-pod-cropped",
        "type": "pod",
        "name": "1042_pod_cropped.pdf",
        "asset": "1042-pod-cropped",
        "reference": "1042",
        "match": true,
        "readable": true,
        "complete": false,
        "signature": false,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1042-rate",
        "type": "rate",
        "name": "1042_rate_clean.pdf",
        "asset": "1042-rate",
        "reference": "1042",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1042-invoice",
        "type": "invoice",
        "name": "1042_invoice_clean.pdf",
        "asset": "1042-invoice",
        "reference": "1042",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1042-0",
        "at": "2026-10-04T14:02:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1042-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1043",
    "customer": "Fieldwork Supply",
    "carrier": "Mesa Freight",
    "email": "mesa@carrier.example",
    "origin": "Tulsa, OK",
    "destination": "Fort Worth, TX",
    "deliveredAt": "2026-10-03T16:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1043-rate",
        "type": "rate",
        "name": "1043_rate_clean.pdf",
        "asset": "1043-rate",
        "reference": "1043",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1043-invoice",
        "type": "invoice",
        "name": "1043_invoice_clean.pdf",
        "asset": "1043-invoice",
        "reference": "1043",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1043-0",
        "at": "2026-10-04T14:03:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1043-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1044",
    "customer": "Common Ground",
    "carrier": "Cedar Road Logistics",
    "email": "cedar@carrier.example",
    "origin": "Wichita, KS",
    "destination": "Dallas, TX",
    "deliveredAt": "2026-10-03T17:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1044-pod-clean",
        "type": "pod",
        "name": "1044_pod_clean.pdf",
        "asset": "1044-pod-clean",
        "reference": "1074",
        "match": false,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1044-rate",
        "type": "rate",
        "name": "1044_rate_clean.pdf",
        "asset": "1044-rate",
        "reference": "1044",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1044-0",
        "at": "2026-10-04T14:04:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1044-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1045",
    "customer": "Everwell Goods",
    "carrier": "Bluebird Transport",
    "email": "bluebird@carrier.example",
    "origin": "Houston, TX",
    "destination": "San Antonio, TX",
    "deliveredAt": "2026-10-03T18:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1045-pod-clean",
        "type": "pod",
        "name": "1045_pod_clean.pdf",
        "asset": "1045-pod-clean",
        "reference": "1045",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1045-rate",
        "type": "rate",
        "name": "1045_rate_clean.pdf",
        "asset": "1045-rate",
        "reference": "1045",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1045-invoice",
        "type": "invoice",
        "name": "1045_invoice_clean.pdf",
        "asset": "1045-invoice",
        "reference": "1045",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1045-0",
        "at": "2026-10-04T14:05:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1045-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1046",
    "customer": "Form & Field",
    "carrier": "Summit Linehaul",
    "email": "summit@carrier.example",
    "origin": "Oklahoma City, OK",
    "destination": "Arlington, TX",
    "deliveredAt": "2026-10-03T19:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1046-pod-damage",
        "type": "pod",
        "name": "1046_pod_damage.pdf",
        "asset": "1046-pod-damage",
        "reference": "1046",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": true,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1046-rate",
        "type": "rate",
        "name": "1046_rate_clean.pdf",
        "asset": "1046-rate",
        "reference": "1046",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1046-invoice",
        "type": "invoice",
        "name": "1046_invoice_clean.pdf",
        "asset": "1046-invoice",
        "reference": "1046",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": true,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1046-0",
        "at": "2026-10-04T14:06:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1046-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1047",
    "customer": "Goodwell Market",
    "carrier": "Prairie Transport",
    "email": "prairie@carrier.example",
    "origin": "Lubbock, TX",
    "destination": "Dallas, TX",
    "deliveredAt": "2026-10-03T20:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1047-rate",
        "type": "rate",
        "name": "1047_rate_clean.pdf",
        "asset": "1047-rate",
        "reference": "1047",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1047-invoice",
        "type": "invoice",
        "name": "1047_invoice_clean.pdf",
        "asset": "1047-invoice",
        "reference": "1047",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": {
      "body": "Please send the signed proof of delivery for load 1047.",
      "subject": "Load 1047 - delivery paperwork",
      "at": "2026-10-04T14:00:00Z",
      "sent": false,
      "demo": true
    },
    "draft": null,
    "events": [
      {
        "id": "event-1047-0",
        "at": "2026-10-04T14:07:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1047-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      },
      {
        "id": "wait-1047",
        "at": "2026-10-04T14:18:00Z",
        "actor": "Simulated carrier",
        "type": "reply",
        "text": "\u201cI\u2019ll send it shortly.\u201d No attachment received. The load remains unresolved."
      }
    ],
    "notes": []
  },
  {
    "id": "1048",
    "customer": "Morrow Supply",
    "carrier": "Clearway Freight",
    "email": "clearway@carrier.example",
    "origin": "San Antonio, TX",
    "destination": "Waco, TX",
    "deliveredAt": "2026-10-03T21:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1048-pod-clean",
        "type": "pod",
        "name": "1048_pod_clean.pdf",
        "asset": "1048-pod-clean",
        "reference": "1048",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1048-rate",
        "type": "rate",
        "name": "1048_rate_clean.pdf",
        "asset": "1048-rate",
        "reference": "1048",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1048-invoice",
        "type": "invoice",
        "name": "1048_invoice_clean.pdf",
        "asset": "1048-invoice",
        "reference": "1048",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "unavailable",
        "checkedAt": null
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1048-0",
        "at": "2026-10-04T14:08:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1048-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  },
  {
    "id": "1049",
    "customer": "Oakline Retail",
    "carrier": "Atlas Road",
    "email": "atlas@carrier.example",
    "origin": "Dallas, TX",
    "destination": "Little Rock, AR",
    "deliveredAt": "2026-10-03T15:42:00Z",
    "importedAt": "2026-10-04T14:02:00Z",
    "deliverySource": "Fictional shipment snapshot \u00b7 October 4",
    "docs": [
      {
        "id": "1049-pod-clean",
        "type": "pod",
        "name": "1049_pod_clean.pdf",
        "asset": "1049-pod-clean",
        "reference": "1049",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1049-rate",
        "type": "rate",
        "name": "1049_rate_clean.pdf",
        "asset": "1049-rate",
        "reference": "1049",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      },
      {
        "id": "1049-invoice",
        "type": "invoice",
        "name": "1049_invoice_clean.pdf",
        "asset": "1049-invoice",
        "reference": "1049",
        "match": true,
        "readable": true,
        "complete": true,
        "signature": true,
        "notation": false,
        "receivedAt": "2026-10-04T14:10:00Z",
        "source": "Sample document mailbox",
        "superseded": false,
        "reviewed": true
      }
    ],
    "sources": [
      {
        "name": "Shipment snapshot",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      },
      {
        "name": "Document mailbox",
        "state": "checked",
        "checkedAt": "2026-10-04T14:14:00Z"
      }
    ],
    "required": [
      "pod",
      "rate",
      "invoice"
    ],
    "exceptionHold": false,
    "pendingRequest": null,
    "draft": null,
    "events": [
      {
        "id": "event-1049-0",
        "at": "2026-10-04T14:09:00Z",
        "actor": "Sample import",
        "type": "import",
        "text": "Delivered status imported from the fictional shipment snapshot. Delivery is not independently verified."
      },
      {
        "id": "event-1049-1",
        "at": "2026-10-04T14:14:00Z",
        "actor": "MAHOGANY demo rules",
        "type": "assess",
        "text": "Sample evidence checked against the Northline demo checklist."
      }
    ],
    "notes": []
  }
];
const REPLACEMENTS = {
  "1042": [
    {
      "id": "1042-replacement",
      "type": "pod",
      "name": "1042_pod_clean.pdf",
      "asset": "1042-replacement",
      "reference": "1042",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1042-new-invoice",
      "type": "invoice",
      "name": "1042_invoice_clean.pdf",
      "asset": "1042-new-invoice",
      "reference": "1042",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1043": [
    {
      "id": "1043-replacement",
      "type": "pod",
      "name": "1043_pod_clean.pdf",
      "asset": "1043-replacement",
      "reference": "1043",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1043-new-invoice",
      "type": "invoice",
      "name": "1043_invoice_clean.pdf",
      "asset": "1043-new-invoice",
      "reference": "1043",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1044": [
    {
      "id": "1044-replacement",
      "type": "pod",
      "name": "1044_pod_clean.pdf",
      "asset": "1044-replacement",
      "reference": "1044",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1044-new-invoice",
      "type": "invoice",
      "name": "1044_invoice_clean.pdf",
      "asset": "1044-new-invoice",
      "reference": "1044",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1045": [
    {
      "id": "1045-replacement",
      "type": "pod",
      "name": "1045_pod_clean.pdf",
      "asset": "1045-replacement",
      "reference": "1045",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1045-new-invoice",
      "type": "invoice",
      "name": "1045_invoice_clean.pdf",
      "asset": "1045-new-invoice",
      "reference": "1045",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1046": [
    {
      "id": "1046-replacement",
      "type": "pod",
      "name": "1046_pod_clean.pdf",
      "asset": "1046-replacement",
      "reference": "1046",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1046-new-invoice",
      "type": "invoice",
      "name": "1046_invoice_clean.pdf",
      "asset": "1046-new-invoice",
      "reference": "1046",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1047": [
    {
      "id": "1047-replacement",
      "type": "pod",
      "name": "1047_pod_clean.pdf",
      "asset": "1047-replacement",
      "reference": "1047",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1047-new-invoice",
      "type": "invoice",
      "name": "1047_invoice_clean.pdf",
      "asset": "1047-new-invoice",
      "reference": "1047",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1048": [
    {
      "id": "1048-replacement",
      "type": "pod",
      "name": "1048_pod_clean.pdf",
      "asset": "1048-replacement",
      "reference": "1048",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1048-new-invoice",
      "type": "invoice",
      "name": "1048_invoice_clean.pdf",
      "asset": "1048-new-invoice",
      "reference": "1048",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ],
  "1049": [
    {
      "id": "1049-replacement",
      "type": "pod",
      "name": "1049_pod_clean.pdf",
      "asset": "1049-replacement",
      "reference": "1049",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    },
    {
      "id": "1049-new-invoice",
      "type": "invoice",
      "name": "1049_invoice_clean.pdf",
      "asset": "1049-new-invoice",
      "reference": "1049",
      "match": true,
      "readable": true,
      "complete": true,
      "signature": true,
      "notation": false,
      "receivedAt": "2026-10-04T14:10:00Z",
      "source": "Sample document mailbox",
      "superseded": false,
      "reviewed": true
    }
  ]
};
