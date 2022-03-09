/**
 * @generated SignedSource<<3e3082af9e2b026a7477d7c5cd649102>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SORT_PRICE = "ASCENDING" | "DESCENDING" | "%future added value";
export type FiltersQuery$variables = {};
export type FiltersQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly showFilter: boolean | null;
    readonly brandsFilters: ReadonlyArray<string | null> | null;
    readonly categoriesFilters: ReadonlyArray<string | null> | null;
    readonly searchText: string | null;
    readonly sortPrice: SORT_PRICE | null;
  } | null;
};
export type FiltersQuery = {
  variables: FiltersQuery$variables;
  response: FiltersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "showFilter",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "brandsFilters",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "categoriesFilters",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "searchText",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sortPrice",
            "storageKey": null
          }
        ]
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FiltersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FiltersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "740fcbc01ad20ea29a62be989787caea",
    "id": null,
    "metadata": {},
    "name": "FiltersQuery",
    "operationKind": "query",
    "text": "query FiltersQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b837d2df31d3032ddf2c07a0b01a783";

export default node;
