import React, {Suspense, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  graphql,
  useLazyLoadQuery,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';

import {
  ErrorBoundaryWithRetry,
  DynamicView,
  DynamicText,
} from '../../components';

import {HomeQuery} from '../../__generated__/HomeQuery.graphql';

import environment from '../../environment';

import Products from './Products';

const HomeQueryGraphQL = graphql`
  query HomeQuery {
    viewer {
      id
      showFilter
      brandsFilters
      categoriesFilters
      searchText
      sortPrice
      cart {
        ...ProductFragmentGraphQL_product
      }
      showFilter
      ...ProductsPagination_viewer
    }
  }
`;

const Home = () => {
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {});
  const environment = useRelayEnvironment();
  useEffect(() => {
    // initialize local state

    commitLocalUpdate(environment, store => {
      const viewerProxy = store
        .getRoot()
        .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

      const cartProxy = viewerProxy.getValue('cart');
      const brandsFiltersProxy = viewerProxy.getValue('brandsFilters');
      const categoriesFiltersProxy = viewerProxy.getValue('categoriesFilters');
      const showFilterProxy = viewerProxy.getValue('showFilter');
      const searchTextProxy = viewerProxy.getValue('searchText');
      const sortPriceProxy = viewerProxy.getValue('sortPrice');

      if (
        viewerProxy &&
        brandsFiltersProxy === undefined &&
        cartProxy === undefined &&
        categoriesFiltersProxy === undefined &&
        showFilterProxy === undefined &&
        searchTextProxy === undefined &&
        sortPriceProxy === undefined
      ) {
        viewerProxy.setLinkedRecords([], 'cart');
        viewerProxy.setValue([], 'brandsFilters');
        viewerProxy.setValue([], 'categoriesFilters');
        viewerProxy.setValue(false, 'showFilter');
        viewerProxy.setValue('', 'searchText');
        viewerProxy.setValue(null, 'sortPrice');
      }
    });
  }, [commitLocalUpdate, environment]);

  return (
    <ErrorBoundaryWithRetry
      fallback={({error, retry}) => (
        <DynamicView flex={1} alignItems="center" justifyContent="center">
          <DynamicText>{error}</DynamicText>
        </DynamicView>
      )}>
      {({fetchKey}) => (
        <Suspense
          fallback={
            <DynamicView flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator size="small" color="#868f99" />
            </DynamicView>
          }>
          {!!viewer && <Products viewer={viewer} />}
        </Suspense>
      )}
    </ErrorBoundaryWithRetry>
  );
};

export default () => (
  <Suspense
    fallback={
      <DynamicView flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="small" color="#868f99" />
      </DynamicView>
    }>
    <Home />
  </Suspense>
);
