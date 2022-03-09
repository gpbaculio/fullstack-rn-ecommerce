/**
 * @generated SignedSource<<a5f88904942d54b22eab47e0fa277f05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SORT_PRICE = "ASCENDING" | "DESCENDING" | "%future added value";
export type PriceFiltersQuery$variables = {};
export type PriceFiltersQuery$data = {
  readonly viewer: {
    readonly sortPrice: SORT_PRICE | null;
  } | null;
};
export type PriceFiltersQuery = {
  variables: PriceFiltersQuery$variables;
  response: PriceFiltersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sortPrice",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PriceFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8cc8a54d6f607ec553637007774a9d14",
    "id": null,
    "metadata": {},
    "name": "PriceFiltersQuery",
    "operationKind": "query",
    "text": "query PriceFiltersQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bbb4631d3e870b263d76e0466512b6a5";

export default node;
