import {
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {Suspense, useCallback, useEffect, useState} from 'react';
import {
  graphql,
  usePaginationFragment,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';

import {DynamicPressable, DynamicText, DynamicView} from '../../components';

import {ProductsPagination_viewer$key} from '../../__generated__/ProductsPagination_viewer.graphql';
import {ProductsPaginationQuery} from '../../__generated__/ProductsPaginationQuery.graphql';
import {ProductFragmentGraphQL_product$key} from '../../__generated__/ProductFragmentGraphQL_product.graphql';

import Product from './Product';
import Filters from './Filters';
import {useDebounce} from '../../hooks';

const ProductsPaginationGraphQL = graphql`
  fragment ProductsPagination_viewer on Viewer
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 10}
    cursor: {type: "String", defaultValue: null}
    search: {type: "String"}
    categories: {type: "[String]"}
    brands: {type: "[String]"}
    sortPrice: {type: "SORT_PRICE"}
  )
  @refetchable(queryName: "ProductsPaginationQuery") {
    id
    showFilter
    searchText
    sortPrice
    shouldRefetch
    cart {
      ...ProductFragmentGraphQL_product
    }
    showFilter
    products(
      first: $count
      after: $cursor
      search: $search
      categories: $categories
      brands: $brands
      sortPrice: $sortPrice
    ) @connection(key: "ProductsPagination_viewer_products") {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          ...ProductFragmentGraphQL_product
        }
      }
    }
  }
`;
interface ProductsProps {
  viewer: ProductsPagination_viewer$key;
}
const Products = ({viewer}: ProductsProps) => {
  const environment = useRelayEnvironment();
  const [text, onChangeText] = useState('');
  const debouncedText = useDebounce(text, 3000);
  useEffect(() => {
    if (debouncedText) {
      commitLocalUpdate(environment, store => {
        const viewerProxy = store.getRoot().getLinkedRecord('viewer');
        if (viewerProxy) {
          viewerProxy.setValue(debouncedText, 'searchText');
          viewerProxy.setValue(true, 'shouldRefetch');
        }
      });
    }
  }, [debouncedText, commitLocalUpdate, environment]);

  const {data, hasNext, loadNext, isLoadingNext, refetch} =
    usePaginationFragment<
      ProductsPaginationQuery,
      ProductsPagination_viewer$key
    >(ProductsPaginationGraphQL, viewer);

  const onFiltersPress = useCallback(() => {
    commitLocalUpdate(environment, store => {
      const viewerProxy = store.getRoot().getLinkedRecord('viewer');
      if (viewerProxy) {
        viewerProxy.setValue(!viewerProxy.getValue('showFilter'), 'showFilter');
      }
    });
  }, [commitLocalUpdate, environment]);

  useEffect(() => {
    if (data.shouldRefetch) {
      refetch(
        {
          search: data.searchText,
          sortPrice: data.sortPrice,
        },
        {
          fetchPolicy: 'store-and-network',
          onComplete: () => {
            commitLocalUpdate(environment, store => {
              const viewerProxy = store.getRoot().getLinkedRecord('viewer');
              if (viewerProxy) {
                viewerProxy.setValue(false, 'shouldRefetch');
              }
            });
          },
        },
      );
    }
  }, [
    data.searchText,
    data.sortPrice,
    data.shouldRefetch,
    refetch,
    commitLocalUpdate,
    environment,
  ]);

  return (
    <>
      <DynamicView
        flexDirection="row"
        paddingHorizontal={16}
        paddingVertical={8}
        backgroundColor="#f5f5f5"
        justifyContent="space-between">
        <DynamicView
          flex={1}
          marginRight={16}
          borderBottomColor="gray"
          borderBottomWidth={1}>
          <TextInput
            style={{paddingVertical: 0}}
            placeholder="Search Products"
            value={text}
            onChangeText={t => onChangeText(t)}
          />
        </DynamicView>
        <DynamicPressable
          backgroundColor="red"
          padding={4}
          alignItems="center"
          justifyContent="center"
          borderRadius={4}
          onPress={onFiltersPress}>
          <DynamicText color={'#fff'} fontWeight="bold">
            Filters
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data?.products?.edges}
        renderItem={({item, index}) => (
          <Product
            key={`product:${index}`}
            product={item?.node as ProductFragmentGraphQL_product$key}
          />
        )}
        keyExtractor={(item, index) => `repo:${index}:${item?.cursor}`}
        ListFooterComponent={() => {
          if (isLoadingNext) {
            return <ActivityIndicator size="large" color="#868f99" />;
          }
          if (hasNext) {
            return (
              <DynamicPressable
                width="100%"
                backgroundColor="red"
                marginTop={8}
                borderRadius={4}
                marginBottom={36}
                paddingVertical={8}
                onPress={() => loadNext(10)}>
                <DynamicText
                  textAlign="center"
                  color={'#fff'}
                  fontWeight="bold">
                  LOAD MORE
                </DynamicText>
              </DynamicPressable>
            );
          }
          return null;
        }}
      />
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
  flatList: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
