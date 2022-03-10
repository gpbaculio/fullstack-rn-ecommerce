import React, {useCallback} from 'react';
import {useRelayEnvironment, commitLocalUpdate} from 'react-relay';

import {DynamicPressable, DynamicText, DynamicView} from '../../../components';
import {HomeQuery} from '../../../__generated__/HomeQuery.graphql';

import {SORT_PRICE} from '../../../__generated__/ProductsPaginationQuery.graphql';
import {useHomeViewer} from '../Home';

const PriceFilters = () => {
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

  const viewer = useHomeViewer();

  return (
    <DynamicView width="100%">
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
