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
  DynamicPressable,
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

const Home = ({fetchKey}: {fetchKey: number}) => {
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {fetchKey});
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
      const shouldRefetchProxy = viewerProxy.getValue('shouldRefetch');

      if (
        viewerProxy &&
        brandsFiltersProxy === undefined &&
        cartProxy === undefined &&
        categoriesFiltersProxy === undefined &&
        showFilterProxy === undefined &&
        searchTextProxy === undefined &&
        sortPriceProxy === undefined &&
        shouldRefetchProxy === undefined
      ) {
        viewerProxy.setLinkedRecords([], 'cart');
        viewerProxy.setValue([], 'brandsFilters');
        viewerProxy.setValue([], 'categoriesFilters');
        viewerProxy.setValue(false, 'showFilter');
        viewerProxy.setValue('', 'searchText');
        viewerProxy.setValue(null, 'sortPrice');
        viewerProxy.setValue(false, 'shouldRefetch');
      }
    });
  }, [commitLocalUpdate, environment]);

  return (
    <Suspense
      fallback={
        <DynamicView flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#868f99" />
        </DynamicView>
      }>
      {!!viewer && <Products viewer={viewer} />}
    </Suspense>
  );
};

export default () => (
  <ErrorBoundaryWithRetry
    fallback={({error, retry}) => (
      <DynamicView flex={1} alignItems="center" justifyContent="center">
        <DynamicText color="red">{error}</DynamicText>
        <DynamicPressable
          onPress={retry}
          borderRadius={4}
          backgroundColor="red">
          <DynamicText color="#fff">RETRY</DynamicText>
        </DynamicPressable>
      </DynamicView>
    )}>
    {({fetchKey}) => <Home fetchKey={fetchKey} />}
  </ErrorBoundaryWithRetry>
);
