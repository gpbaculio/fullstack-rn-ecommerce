/**
 * @generated SignedSource<<0deb5e6b840721d07ff6deb46b692559>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CategoriesFilterQuery$variables = {};
export type CategoriesFilterQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly categoriesFilters: ReadonlyArray<string | null> | null;
    readonly products: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly category: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type CategoriesFilterQuery = {
  variables: CategoriesFilterQuery$variables;
  response: CategoriesFilterQuery$data;
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
                    "name": "category",
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
            "name": "categoriesFilters",
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
    "name": "CategoriesFilterQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesFilterQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "344511e3fcc8921204d4d0dcace62ead",
    "id": null,
    "metadata": {},
    "name": "CategoriesFilterQuery",
    "operationKind": "query",
    "text": "query CategoriesFilterQuery {\n  viewer {\n    id\n    products {\n      edges {\n        cursor\n        node {\n          id\n          category\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4accac80f6118069f2f423751d87c70d";

export default node;
