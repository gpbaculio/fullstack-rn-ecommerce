import {FlatList, ActivityIndicator, Pressable, TextInput} from 'react-native';
import React, {useCallback} from 'react';
import {
  graphql,
  usePaginationFragment,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';

import {DynamicText, DynamicView} from '../../components';

import {ProductsPagination_viewer$key} from '../../__generated__/ProductsPagination_viewer.graphql';
import {ProductsPaginationQuery} from '../../__generated__/ProductsPaginationQuery.graphql';
import {ProductFragmentGraphQL_product$key} from '../../__generated__/ProductFragmentGraphQL_product.graphql';

import Product from './Product';
import Filters from './Filters';

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

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <DynamicView
            flexDirection="row"
            paddingHorizontal={16}
            paddingVertical={8}
            backgroundColor="green"
            justifyContent="space-between">
            <DynamicView
              flex={1}
              marginRight={16}
              borderBottomColor="gray"
              borderBottomWidth={1}>
              <TextInput placeholder="Search Products" />
            </DynamicView>
            {/* use refetch when filtering */}
            <DynamicView backgroundColor="red">
              <Pressable onPress={onFiltersPress}>
                <DynamicText color={'blue'}>Filters</DynamicText>
              </Pressable>
            </DynamicView>
          </DynamicView>
        )}
        data={data?.products?.edges}
        renderItem={({item}) => (
          <Product product={item?.node as ProductFragmentGraphQL_product$key} />
        )}
        keyExtractor={(item, index) => `repo:${index}:${item?.cursor}`}
        ListFooterComponent={() => {
          if (isLoadingNext) {
            return <ActivityIndicator size="large" color="#868f99" />;
          }
          if (hasNext) {
            return (
              <Pressable onPress={() => loadNext(10)}>
                <DynamicText color={'red'}>Load More</DynamicText>
              </Pressable>
            );
          }
          return null;
        }}
      />
      <Filters showFilter={!!data.showFilter} />
    </>
  );
};

export default Products;
