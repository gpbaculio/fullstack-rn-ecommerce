import {View} from 'react-native';
import React from 'react';
import {graphql, useLazyLoadQuery} from 'react-relay';

import {DynamicText} from '../components';

import {BrandsFilterQuery} from '../__generated__/BrandsFilterQuery.graphql';

const BrandsFilterGraphQLQuery = graphql`
  query BrandsFilterQuery {
    viewer {
      id
      products {
        edges {
          cursor
          node {
            id
            brand
          }
        }
      }
    }
  }
`;

const BrandsFilter = () => {
  const {viewer} = useLazyLoadQuery<BrandsFilterQuery>(
    BrandsFilterGraphQLQuery,
    {},
  );
  return (
    <View>
      {viewer?.products?.edges
        ?.filter(
          (value, index, self) =>
            self.findIndex(v => v?.node?.brand === value?.node?.brand) ===
            index,
        )
        .map(i => (
          <DynamicText key={i?.cursor}>{i?.node?.brand}</DynamicText>
        ))}
    </View>
  );
};

export default BrandsFilter;
