import React, {useCallback} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  useRelayEnvironment,
  commitLocalUpdate,
} from 'react-relay';

import {DynamicPressable, DynamicText, DynamicView} from '../../../components';

import {PriceFiltersQuery} from '../../../__generated__/PriceFiltersQuery.graphql';
import {SORT_PRICE} from '../../../__generated__/ProductsPaginationQuery.graphql';

const PriceFiltersGraphQLQuery = graphql`
  query PriceFiltersQuery {
    viewer {
      sortPrice
    }
  }
`;

const PriceFilters = () => {
  const environment = useRelayEnvironment();
  const {viewer} = useLazyLoadQuery<PriceFiltersQuery>(
    PriceFiltersGraphQLQuery,
    {},
  );

  const onPriceFilterPress = useCallback(
    (priceFilter: SORT_PRICE) => {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store
          .getRoot()
          .getLinkedRecord<PriceFiltersQuery['response']['viewer']>('viewer');
        const sortPriceProxy = viewerProxy.getValue('sortPrice');
        if (sortPriceProxy === priceFilter) {
          viewerProxy.setValue(null, 'sortPrice');
        } else {
          viewerProxy.setValue(priceFilter, 'sortPrice');
        }
      });
    },
    [environment, commitLocalUpdate],
  );

  return (
    <DynamicView>
      <DynamicText color={'#fff'} fontWeight="bold">
        PRICE
      </DynamicText>
      <DynamicView
        flexDirection="row"
        width="100%"
        marginTop={6}
        justifyContent="space-around">
        <DynamicPressable
          borderColor={'red'}
          borderWidth={1}
          borderRadius={4}
          paddingVertical={3}
          paddingHorizontal={6}
          flex={1}
          onPress={() => onPriceFilterPress('DESCENDING')}
          backgroundColor={
            viewer?.sortPrice === 'DESCENDING' ? 'red' : 'transparent'
          }
          marginRight={6}
          alignItems="center">
          <DynamicText color={'#fff'} fontWeight="bold">
            High to Low
          </DynamicText>
        </DynamicPressable>
        <DynamicPressable
          onPress={() => onPriceFilterPress('ASCENDING')}
          backgroundColor={
            viewer?.sortPrice === 'ASCENDING' ? 'red' : 'transparent'
          }
          borderColor={'red'}
          borderWidth={1}
          borderRadius={4}
          paddingVertical={3}
          paddingHorizontal={6}
          flex={1}
          marginLeft={6}
          alignItems="center">
          <DynamicText color={'#fff'} fontWeight="bold">
            Low to High
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
    </DynamicView>
  );
};

export default PriceFilters;
