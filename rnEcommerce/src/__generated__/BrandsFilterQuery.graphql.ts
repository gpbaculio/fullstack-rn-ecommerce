/**
 * @generated SignedSource<<7a3483e2b27296d3b29449e78bd18f12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type BrandsFilterQuery$variables = {};
export type BrandsFilterQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly brandsFilters: ReadonlyArray<string | null> | null;
    readonly products: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly brand: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type BrandsFilterQuery = {
  variables: BrandsFilterQuery$variables;
  response: BrandsFilterQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Viewer",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ProductsConnection",
        "kind": "LinkedField",
        "name": "products",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Product",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "brand",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "brandsFilters",
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
    "name": "BrandsFilterQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BrandsFilterQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aaff604031e5a32ccdecd1b8583f2363",
    "id": null,
    "metadata": {},
    "name": "BrandsFilterQuery",
    "operationKind": "query",
    "text": "query BrandsFilterQuery {\n  viewer {\n    id\n    products {\n      edges {\n        cursor\n        node {\n          id\n          brand\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ee5db4ec8220ad7d293953f10c78381";

export default node;
