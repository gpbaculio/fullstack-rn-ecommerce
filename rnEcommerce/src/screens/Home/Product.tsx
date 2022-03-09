import React, {useCallback, useEffect} from 'react';
import {
  graphql,
  useFragment,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';

import {
  ProductFragmentGraphQL_product$data,
  ProductFragmentGraphQL_product$key,
} from '../../__generated__/ProductFragmentGraphQL_product.graphql';
import {DynamicPressable, DynamicText, DynamicView} from '../../components';
import {HomeQuery} from '../../__generated__/HomeQuery.graphql';
import {RecordProxy} from 'relay-runtime';

export const ProductFragmentGraphQL = graphql`
  fragment ProductFragmentGraphQL_product on Product {
    id
    brand
    barCode
    price
    category
    display_name
    isAddedToCart
  }
`;

interface ProductProps {
  product: ProductFragmentGraphQL_product$key;
}

const Product = ({product}: ProductProps) => {
  const environment = useRelayEnvironment();

  const node = useFragment(ProductFragmentGraphQL, product);

  useEffect(() => {
    commitLocalUpdate(environment, store => {
      const nodeProxy = store.get(node.id);
      if (nodeProxy) {
        nodeProxy.setValue(false, 'isAddedToCart');
      }
    });
  }, []);

  const onAddToCartPress = useCallback(
    nodeId => {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store
          .getRoot()
          .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

        const cartRecords =
          viewerProxy.getLinkedRecords<ProductFragmentGraphQL_product$key[]>(
            'cart',
          );

        const cartNodeIds = cartRecords?.map(i => i.getDataID());

        const nodeProxy =
          store.get<ProductFragmentGraphQL_product$data>(nodeId);

        if (!cartNodeIds?.includes(nodeId) && viewerProxy) {
          viewerProxy.setLinkedRecords(
            [
              ...cartRecords,
              nodeProxy as RecordProxy<ProductFragmentGraphQL_product$data>,
            ],
            'cart',
          );
        }
        if (nodeProxy) {
          nodeProxy.setValue(true, 'isAddedToCart');
        }
      });
    },
    [commitLocalUpdate, environment],
  );

  return (
    <DynamicView
      paddingVertical={6}
      borderWidth={0.5}
      borderColor="red"
      borderRadius={4}
      marginBottom={6}>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        marginHorizontal={8}>
        <DynamicText textAlign="center" fontWeight="bold" color="red">
          Category: {node.category}
        </DynamicText>
        <DynamicText textAlign="center" fontWeight="bold" color="red">
          Brand: {node.brand}
        </DynamicText>
      </DynamicView>
      <DynamicView marginVertical={3}>
        <DynamicText textAlign="center" fontWeight="bold" color="red">
          {node.display_name}
        </DynamicText>
      </DynamicView>
      <DynamicView
        marginHorizontal={8}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicText fontWeight="bold" color="red">
          Price: {node.price}
        </DynamicText>
        <DynamicPressable
          opacity={node.isAddedToCart ? 0.5 : 1}
          disabled={node.isAddedToCart}
          onPress={() => {
            onAddToCartPress(node.id);
          }}
          backgroundColor="red"
          padding={3}
          borderRadius={4}>
          <DynamicText fontWeight="bold" color="#fff">
            ADD to Cart
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
    </DynamicView>
  );
};

export default Product;
