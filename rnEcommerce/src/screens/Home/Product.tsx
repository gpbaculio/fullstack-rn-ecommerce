import {View, Text} from 'react-native';
import React from 'react';
import {graphql, useFragment} from 'react-relay';
import {ProductFragmentGraphQL_product$key} from '../../__generated__/ProductFragmentGraphQL_product.graphql';

const ProductFragmentGraphQL = graphql`
  fragment ProductFragmentGraphQL_product on Product {
    id
    brand
    barCode
    price
    category
    display_name
  }
`;

interface ProductProps {
  product: ProductFragmentGraphQL_product$key;
}

const Product = ({product}: ProductProps) => {
  const node = useFragment(ProductFragmentGraphQL, product);
  return (
    <View>
      <Text>{node.display_name}</Text>
    </View>
  );
};

export default Product;
