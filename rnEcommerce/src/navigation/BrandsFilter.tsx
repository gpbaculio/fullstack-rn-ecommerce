import {Platform, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {graphql, useLazyLoadQuery} from 'react-relay';

import {
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '../components';

import {BrandsFilterQuery} from '../__generated__/BrandsFilterQuery.graphql';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FilterHeader from './FilterHeader';

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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
interface BrandEdge {
  readonly cursor: string;
  readonly node: {
    readonly id: string;
    readonly brand: string | null;
  } | null;
}

const BrandsFilter = () => {
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
            <DynamicAnimatedView
              key={`${index}:${(item as BrandEdge)?.node?.id}`}
              marginBottom={8}
              width={'32%'}
              justifyContent="center"
              alignItems="center"
              borderColor="red"
              borderRadius={4}
              style={itemStyle}>
              <DynamicText
                fontSize={10}
                textAlign="center"
                fontWeight="bold"
                color="#fff">
                {(item as BrandEdge)?.node?.brand}
              </DynamicText>
            </DynamicAnimatedView>
          ))}
      </DynamicAnimatedView>
    </DynamicView>
  );
};

export default BrandsFilter;
