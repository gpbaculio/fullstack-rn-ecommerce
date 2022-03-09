import {Platform} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  graphql,
  useLazyLoadQuery,
  useRelayEnvironment,
  commitLocalUpdate,
} from 'react-relay';

import {
  DynamicAnimatedPressable,
  DynamicAnimatedView,
  DynamicText,
  DynamicView,
} from '../../../components';

import {BrandsFilterQuery} from '../../../__generated__/BrandsFilterQuery.graphql';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FilterHeader from './FilterHeader';
import {Primitive} from 'relay-runtime/lib/store/RelayStoreTypes';

const BrandsFilterGraphQLQuery = graphql`
  query BrandsFilterQuery {
    viewer {
      id
      brandsFilters
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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
interface BrandEdge {
  readonly cursor: string;
  readonly node: {
    readonly id: string;
    readonly brand: string | null;
  } | null;
}

const BrandsFilter = () => {
  const environment = useRelayEnvironment();
  const {viewer} = useLazyLoadQuery<BrandsFilterQuery>(
    BrandsFilterGraphQLQuery,
    {},
  );
  const [showFilters, setShowFilters] = useState(false);
  const flatListHeight = useSharedValue(0);

  const onShowFiltersPress = useCallback(() => {
    setShowFilters(v => !v);
  }, [setShowFilters]);

  const filtersStyle = useAnimatedStyle(
    () => ({
      height: withTiming(flatListHeight.value),
    }),
    [flatListHeight.value, withTiming],
  );

  useAnimatedReaction(
    () => {
      return showFilters;
    },
    show => {
      flatListHeight.value = show
        ? Platform.OS === 'ios'
          ? 1800 - 100
          : 1800
        : 0;
    },
    [showFilters, flatListHeight.value, Platform.OS],
  );

  const itemStyle = useAnimatedStyle(
    () => ({
      paddingVertical: withTiming(showFilters ? 3 : 0),
      borderWidth: withTiming(showFilters ? 1 : 0),
      opacity: withTiming(showFilters ? 1 : 0),
    }),
    [showFilters, withTiming],
  );
  const onBrandPress = useCallback(
    (brand: string) => {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store
          .getRoot()
          .getLinkedRecord<BrandsFilterQuery['response']['viewer']>('viewer');
        if (viewerProxy) {
          const brandsFilters = viewerProxy.getValue(
            'brandsFilters',
          ) as Primitive[];

          if (brandsFilters.includes(brand)) {
            viewerProxy.setValue(
              brandsFilters.filter(i => i !== brand),
              'brandsFilters',
            );
          } else {
            viewerProxy.setValue([...brandsFilters, brand], 'brandsFilters');
          }
        }
      });
    },
    [commitLocalUpdate, environment],
  );

  return (
    <DynamicView>
      <FilterHeader
        title="BRANDS"
        length={
          viewer?.products?.edges?.filter(
            (value, index, self) =>
              self.findIndex(v => v?.node?.brand === value?.node?.brand) ===
              index,
          ).length
        }
        onShowHandlerPress={onShowFiltersPress}
        showHandlerText={showFilters ? 'HIDE' : 'SHOW'}
      />
      <DynamicAnimatedView
        style={filtersStyle}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        paddingTop={8}>
        {viewer?.products?.edges
          ?.filter(
            (value, index, self) =>
              self.findIndex(v => v?.node?.brand === value?.node?.brand) ===
              index,
          )
          .map((item, index) => (
            <DynamicAnimatedPressable
              onPress={() =>
                onBrandPress((item as BrandEdge)?.node?.brand as string)
              }
              key={`${index}:${(item as BrandEdge)?.node?.id}`}
              marginBottom={8}
              width={'32%'}
              justifyContent="center"
              alignItems="center"
              borderColor="red"
              borderRadius={4}
              backgroundColor={
                viewer.brandsFilters?.includes(
                  (item as BrandEdge)?.node?.brand as string,
                )
                  ? 'red'
                  : 'transparent'
              }
              style={itemStyle}>
              <DynamicText
                fontSize={10}
                textAlign="center"
                fontWeight="bold"
                color="#fff">
                {(item as BrandEdge)?.node?.brand}
              </DynamicText>
            </DynamicAnimatedPressable>
          ))}
      </DynamicAnimatedView>
    </DynamicView>
  );
};

export default BrandsFilter;
