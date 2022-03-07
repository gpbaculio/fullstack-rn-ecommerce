import {FlatList, useWindowDimensions, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {graphql, useLazyLoadQuery} from 'react-relay';

import {DynamicPressable, DynamicText, DynamicView} from '../components';

import {CategoriesFilterQuery} from '../__generated__/CategoriesFilterQuery.graphql';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CategoriesFilterGraphQLQuery = graphql`
  query CategoriesFilterQuery {
    viewer {
      id
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
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface CategoryEdge {
  readonly cursor: string;
  readonly node: {
    readonly id: string;
    readonly category: string | null;
  } | null;
}

const CategoriesFilter = () => {
  const {viewer} = useLazyLoadQuery<CategoriesFilterQuery>(
    CategoriesFilterGraphQLQuery,
    {},
  );
  const actualHeight = useSharedValue(0);
  const flatListHeight = useSharedValue(actualHeight.value);
  const flatListStyle = useAnimatedStyle(() => {
    return {
      height: flatListHeight.value,
    };
  }, [flatListHeight.value]);

  const [showLess, setShowLess] = useState(false);

  const onShowPress = useCallback(() => {
    if (flatListHeight.value !== actualHeight.value) {
      flatListHeight.value = withTiming(actualHeight.value);
    } else {
      flatListHeight.value = withTiming(actualHeight.value / 2 - 16);
    }
    setShowLess(v => !v);
  }, [actualHeight.value, flatListHeight.value, setShowLess]);

  return (
    <>
      <AnimatedFlatList
        style={flatListStyle}
        ListHeaderComponentStyle={{marginBottom: 16}}
        ListHeaderComponent={() => (
          <DynamicText color={'#fff'} fontWeight="bold" marginBottom={8}>
            CATEGORIES
          </DynamicText>
        )}
        onContentSizeChange={(_, height) => {
          if (height) {
            actualHeight.value = height;
            flatListHeight.value = height / 2;
          }
        }}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 6}}
        data={viewer?.products?.edges?.filter(
          (value, index, self) =>
            self.findIndex(v => v?.node?.category === value?.node?.category) ===
            index,
        )}
        numColumns={3}
        renderItem={({item}) => (
          <DynamicView
            width={'32%'}
            borderRadius={4}
            justifyContent="center"
            paddingVertical={3}
            alignItems="center"
            backgroundColor={'green'}
            borderColor="red"
            borderWidth={1}>
            <DynamicText textAlign="center" fontWeight="bold">
              {(item as CategoryEdge)?.node?.category}
            </DynamicText>
          </DynamicView>
        )}
        scrollEnabled={false}
        keyExtractor={item => `${(item as CategoryEdge)?.cursor}`}
      />
      <DynamicPressable
        onPress={onShowPress}
        paddingVertical={8}
        borderBottomColor="red"
        borderBottomWidth={1}
        alignItems="center">
        <DynamicText fontWeight="bold" color="#fff">
          {showLess ? 'SHOW LESS' : 'SHOW MORE'}
        </DynamicText>
      </DynamicPressable>
    </>
  );
};

export default CategoriesFilter;
