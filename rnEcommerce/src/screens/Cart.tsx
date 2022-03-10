import React from 'react';
import {useFragment} from 'react-relay';
import {DynamicPressable, DynamicText, DynamicView} from '../components';
import {ProductFragmentGraphQL_product$key} from '../__generated__/ProductFragmentGraphQL_product.graphql';

import {useHomeViewer} from './Home/Home';
import {ProductFragmentGraphQL} from './Home/Product';

// export type CartRouteProps = RouteProp<AppStackParamList, 'Cart'>;

const CartItem = ({product}: {product: ProductFragmentGraphQL_product$key}) => {
  const node = useFragment(ProductFragmentGraphQL, product);
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
          Category: {node?.category}
        </DynamicText>
        <DynamicText textAlign="center" fontWeight="bold" color="red">
          Brand: {node?.brand}
        </DynamicText>
      </DynamicView>
      <DynamicView marginVertical={3}>
        <DynamicText textAlign="center" fontWeight="bold" color="red">
          {node?.display_name}
        </DynamicText>
      </DynamicView>
      <DynamicView
        marginHorizontal={8}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicText fontWeight="bold" color="red">
          Price: {node?.price}
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );
};
const Cart = () => {
  const viewer = useHomeViewer();

  return (
    <DynamicView padding={16}>
      {viewer?.cart?.map((node, index) => (
        <CartItem
          key={`cart:${index}`}
          product={node as ProductFragmentGraphQL_product$key}
        />
      ))}
      <DynamicPressable
        width="100%"
        backgroundColor="red"
        marginTop={8}
        borderRadius={4}
        marginBottom={36}
        paddingVertical={8}>
        <DynamicText textAlign="center" color={'#fff'} fontWeight="bold">
          CHECKOUT
        </DynamicText>
      </DynamicPressable>
    </DynamicView>
  );
};

export default Cart;
