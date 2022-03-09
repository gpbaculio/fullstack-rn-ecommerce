/**
 * @generated SignedSource<<b9ba73e35254a671238af977b6ffa66c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductFragmentGraphQL_product$data = {
  readonly id: string;
  readonly brand: string | null;
  readonly barCode: string | null;
  readonly price: string | null;
  readonly category: string | null;
  readonly display_name: string | null;
  readonly isAddedToCart: boolean | null;
  readonly " $fragmentType": "ProductFragmentGraphQL_product";
};
export type ProductFragmentGraphQL_product$key = {
  readonly " $data"?: ProductFragmentGraphQL_product$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductFragmentGraphQL_product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductFragmentGraphQL_product",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "brand",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "barCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "display_name",
      "storageKey": null
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAddedToCart",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "3a6b604b87915c419221449b7dacdad6";

export default node;
