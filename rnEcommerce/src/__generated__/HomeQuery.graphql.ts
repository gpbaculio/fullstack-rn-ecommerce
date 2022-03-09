/**
 * @generated SignedSource<<9719b9a26b2217aca143831f914a053c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type SORT_PRICE = 'ASCENDING' | 'DESCENDING' | '%future added value';
export type HomeQuery$variables = {};
export type HomeQuery$data = {
  readonly viewer: {
    readonly showFilter: boolean | null;
    readonly searchText: string | null;
    readonly sortPrice: SORT_PRICE | null;
    readonly shouldRefetch: boolean | null;
    readonly cart: ReadonlyArray<{
      readonly id: string;
      readonly brand: string | null;
      readonly barCode: string | null;
      readonly price: string | null;
      readonly category: string | null;
      readonly display_name: string | null;
      readonly isAddedToCart: boolean | null;
      readonly ' $fragmentSpreads': FragmentRefs<'ProductFragmentGraphQL_product'>;
    } | null> | null;
    readonly productsCount: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly brand: string | null;
          readonly category: string | null;
          readonly ' $fragmentSpreads': FragmentRefs<'ProductFragmentGraphQL_product'>;
        } | null;
      } | null> | null;
    } | null;
    readonly ' $fragmentSpreads': FragmentRefs<'ProductsPagination_viewer'>;
  } | null;
};
export type HomeQuery = {
  variables: HomeQuery$variables;
  response: HomeQuery$data;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'cursor',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'brand',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'category',
      storageKey: null,
    },
    v4 = {
      args: null,
      kind: 'FragmentSpread',
      name: 'ProductFragmentGraphQL_product',
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'showFilter',
      storageKey: null,
    },
    v6 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'searchText',
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'sortPrice',
      storageKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'shouldRefetch',
      storageKey: null,
    },
    v9 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'barCode',
      storageKey: null,
    },
    v10 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'price',
      storageKey: null,
    },
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'display_name',
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'isAddedToCart',
      storageKey: null,
    },
    v13 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 10,
      },
    ],
    v14 = {
      kind: 'ClientExtension',
      selections: [v12 /*: any*/],
    };
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'HomeQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Viewer',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'ProductsPagination_viewer',
            },
            {
              alias: 'productsCount',
              args: null,
              concreteType: 'ProductsConnection',
              kind: 'LinkedField',
              name: 'products',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ProductsEdge',
                  kind: 'LinkedField',
                  name: 'edges',
                  plural: true,
                  selections: [
                    v0 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Product',
                      kind: 'LinkedField',
                      name: 'node',
                      plural: false,
                      selections: [
                        v1 /*: any*/,
                        v2 /*: any*/,
                        v3 /*: any*/,
                        v4 /*: any*/,
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              kind: 'ClientExtension',
              selections: [
                v5 /*: any*/,
                v6 /*: any*/,
                v7 /*: any*/,
                v8 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Product',
                  kind: 'LinkedField',
                  name: 'cart',
                  plural: true,
                  selections: [
                    v4 /*: any*/,
                    v1 /*: any*/,
                    v2 /*: any*/,
                    v9 /*: any*/,
                    v10 /*: any*/,
                    v3 /*: any*/,
                    v11 /*: any*/,
                    v12 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'HomeQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Viewer',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            v1 /*: any*/,
            {
              alias: null,
              args: v13 /*: any*/,
              concreteType: 'ProductsConnection',
              kind: 'LinkedField',
              name: 'products',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'PageInfo',
                  kind: 'LinkedField',
                  name: 'pageInfo',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'startCursor',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'endCursor',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'hasNextPage',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'hasPreviousPage',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: 'ProductsEdge',
                  kind: 'LinkedField',
                  name: 'edges',
                  plural: true,
                  selections: [
                    v0 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Product',
                      kind: 'LinkedField',
                      name: 'node',
                      plural: false,
                      selections: [
                        v1 /*: any*/,
                        v2 /*: any*/,
                        v9 /*: any*/,
                        v10 /*: any*/,
                        v3 /*: any*/,
                        v11 /*: any*/,
                        v14 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: '__typename',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: 'products(first:10)',
            },
            {
              alias: null,
              args: v13 /*: any*/,
              filters: ['search', 'categories', 'brands', 'sortPrice'],
              handle: 'connection',
              key: 'ProductsPagination_viewer_products',
              kind: 'LinkedHandle',
              name: 'products',
            },
            {
              kind: 'ClientExtension',
              selections: [
                v5 /*: any*/,
                v6 /*: any*/,
                v7 /*: any*/,
                v8 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Product',
                  kind: 'LinkedField',
                  name: 'cart',
                  plural: true,
                  selections: [
                    v1 /*: any*/,
                    v2 /*: any*/,
                    v9 /*: any*/,
                    v10 /*: any*/,
                    v3 /*: any*/,
                    v11 /*: any*/,
                    v12 /*: any*/,
                  ],
                  storageKey: null,
                },
              ],
            },
            {
              alias: 'productsCount',
              args: null,
              concreteType: 'ProductsConnection',
              kind: 'LinkedField',
              name: 'products',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ProductsEdge',
                  kind: 'LinkedField',
                  name: 'edges',
                  plural: true,
                  selections: [
                    v0 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Product',
                      kind: 'LinkedField',
                      name: 'node',
                      plural: false,
                      selections: [
                        v1 /*: any*/,
                        v2 /*: any*/,
                        v3 /*: any*/,
                        v9 /*: any*/,
                        v10 /*: any*/,
                        v11 /*: any*/,
                        v14 /*: any*/,
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '08c13303f1bacf92efe768d0b4a8ef15',
      id: null,
      metadata: {},
      name: 'HomeQuery',
      operationKind: 'query',
      text: 'query HomeQuery {\n  viewer {\n    ...ProductsPagination_viewer\n    productsCount: products {\n      edges {\n        cursor\n        node {\n          id\n          brand\n          category\n          ...ProductFragmentGraphQL_product\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ProductFragmentGraphQL_product on Product {\n  id\n  brand\n  barCode\n  price\n  category\n  display_name\n}\n\nfragment ProductsPagination_viewer on Viewer {\n  id\n  products(first: 10) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...ProductFragmentGraphQL_product\n        __typename\n      }\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '5d9d51dfb367cc6cbe132f56926918e3';

export default node;
