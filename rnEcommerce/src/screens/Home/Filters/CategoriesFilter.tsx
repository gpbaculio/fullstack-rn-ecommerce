import React, {useCallback, useState} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  useRelayEnvironment,
  commitLocalUpdate,
} from 'react-relay';
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Primitive} from 'relay-runtime/lib/store/RelayStoreTypes';

import {
  DynamicAnimatedPressable,
  DynamicAnimatedView,
  DynamicText,
  DynamicView,
} from '../../../components';

import FilterHeader from './FilterHeader';
import {HomeQuery} from '../../../__generated__/HomeQuery.graphql';
import {CategoriesFilterQuery} from '../../../__generated__/CategoriesFilterQuery.graphql';

const CategoriesFilterGraphQLQuery = graphql`
  query CategoriesFilterQuery {
    viewer {
      id
      categoriesFilters
      products {
        edges {
          cursor
          node {
            id
            category
          }
        }
      }
    }
  }
`;

interface CategoryEdge {
  readonly cursor: string;
  readonly node: {
    readonly id: string;
    readonly category: string | null;
  } | null;
}

const CategoriesFilter = () => {
  const environment = useRelayEnvironment();
  const {viewer} = useLazyLoadQuery<CategoriesFilterQuery>(
    CategoriesFilterGraphQLQuery,
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
    () => showFilters,
    show => {
      flatListHeight.value = show ? 335 : 0;
    },
    [showFilters, flatListHeight.value],
  );

  const itemStyle = useAnimatedStyle(
    () => ({
      paddingVertical: withTiming(showFilters ? 3 : 0),
      borderWidth: withTiming(showFilters ? 1 : 0),
      opacity: withTiming(showFilters ? 1 : 0),
    }),
    [showFilters, withTiming],
  );

  const onCategoryPress = useCallback(
    (category: string) => {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store
          .getRoot()
          .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

        if (viewerProxy) {
          const categoriesFilters = viewerProxy.getValue(
            'categoriesFilters',
          ) as Primitive[];
          if (categoriesFilters.includes(category)) {
            viewerProxy.setValue(
              categoriesFilters.filter(i => i !== category),
              'categoriesFilters',
            );
          } else {
            viewerProxy.setValue(
              [...categoriesFilters, category],
              'categoriesFilters',
            );
          }
        }
      });
    },
    [commitLocalUpdate, environment],
  );
  return (
    <DynamicView>
      <FilterHeader
        title="CATEGORIES"
        length={
          viewer?.products?.edges?.filter(
            (value, index, self) =>
              self.findIndex(
                v => v?.node?.category === value?.node?.category,
              ) === index,
          ).length
        }
        onShowHandlerPress={onShowFiltersPress}
        showHandlerText={showFilters ? 'HIDE' : 'SHOW'}
      />
      <DynamicAnimatedView
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        paddingTop={8}
        style={filtersStyle}>
        {viewer?.products?.edges
          ?.filter(
            (value, index, self) =>
              self.findIndex(
                v => v?.node?.category === value?.node?.category,
              ) === index,
          )
          .map((item, index) => (
            <DynamicAnimatedPressable
              onPress={() => onCategoryPress(item?.node?.category as string)}
              key={`${index}:${(item as CategoryEdge)?.node?.id}`}
              marginBottom={8}
              width={'32%'}
              backgroundColor={
                viewer?.categoriesFilters?.includes(
                  (item as CategoryEdge)?.node?.category as string,
                )
                  ? 'red'
                  : 'transparent'
              }
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
                {(item as CategoryEdge)?.node?.category}
              </DynamicText>
            </DynamicAnimatedPressable>
          ))}
      </DynamicAnimatedView>
    </DynamicView>
  );
};

export default CategoriesFilter;
