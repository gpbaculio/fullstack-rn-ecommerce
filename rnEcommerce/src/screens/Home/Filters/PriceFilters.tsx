import React, {useCallback} from 'react';
import {useRelayEnvironment, commitLocalUpdate} from 'react-relay';

import {DynamicPressable, DynamicText, DynamicView} from '../../../components';
import {HomeQuery} from '../../../__generated__/HomeQuery.graphql';

import {SORT_PRICE} from '../../../__generated__/ProductsPaginationQuery.graphql';
import {useHomeViewer} from '../Home';

const PriceFilter = ({
  sortPrice,
  type,
}: {
  sortPrice: SORT_PRICE;
  type: SORT_PRICE;
}) => {
  const environment = useRelayEnvironment();

  const onPriceFilterPress = useCallback(
    (priceFilter: SORT_PRICE) => {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store
          .getRoot()
          .getLinkedRecord<HomeQuery>('viewer');
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
    <DynamicPressable
      borderColor={'red'}
      borderWidth={1}
      borderRadius={4}
      paddingVertical={3}
      paddingHorizontal={6}
      flex={1}
      onPress={() => {
        onPriceFilterPress(type === 'DESCENDING' ? 'DESCENDING' : 'ASCENDING');
      }}
      backgroundColor={sortPrice === type ? 'red' : 'transparent'}
      marginRight={6}
      alignItems="center">
      <DynamicText color={'#fff'} fontWeight="bold">
        {type === 'DESCENDING' ? 'High to Low' : 'Low to High'}
      </DynamicText>
    </DynamicPressable>
  );
};

const PriceFilters = () => {
  const viewer = useHomeViewer();

  return (
    <DynamicView width="100%">
      <DynamicText color={'#fff'} fontWeight="bold">
        PRICE
      </DynamicText>
      <DynamicView flexDirection="row" marginTop={8}>
        <PriceFilter
          key={'price-filter-descending'}
          sortPrice={viewer?.sortPrice as SORT_PRICE}
          type="DESCENDING"
        />
        <PriceFilter
          key={'price-filter-ascending'}
          sortPrice={viewer?.sortPrice as SORT_PRICE}
          type="ASCENDING"
        />
      </DynamicView>
    </DynamicView>
  );
};

export default PriceFilters;
