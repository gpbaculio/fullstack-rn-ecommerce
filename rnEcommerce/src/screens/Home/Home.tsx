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
import environment from '../../environment';
import {useCountRenders} from '../../useCountRenders';

import {HomeQuery, HomeQuery$data} from '../../__generated__/HomeQuery.graphql';
import {ProductsPagination_viewer$key} from '../../__generated__/ProductsPagination_viewer.graphql';
import Filters from './Filters';

import Products from './Products';

export const HomeQueryGraphQL = graphql`
  query HomeQuery {
    viewer {
      showFilter
      searchText
      sortPrice
      shouldRefetch
      cart {
        ...ProductFragmentGraphQL_product
        id
        brand
        barCode
        price
        category
        display_name
        isAddedToCart
      }
      showFilter
      ...ProductsPagination_viewer
      productsCount: products {
        edges {
          cursor
          node {
            id
            brand
            category
            ...ProductFragmentGraphQL_product
          }
        }
      }
    }
  }
`;

// initialize local state
export const useHomeViewer = (fetchKey: number) => {
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {fetchKey});
  return viewer;
};

const Home = ({fetchKey}: {fetchKey: number}) => {
  const environment = useRelayEnvironment();
  const viewer = useHomeViewer(fetchKey);
  useEffect(() => {
    console.log('render');
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
      <Products viewer={viewer as ProductsPagination_viewer$key} />
      <Filters fetchKey={fetchKey} showFilter={!!viewer?.showFilter} />
    </Suspense>
  );
};

export const FetchKeyContext = React.createContext(0);

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
    {({fetchKey}) => (
      <FetchKeyContext.Provider value={fetchKey}>
        <Home fetchKey={fetchKey} />
      </FetchKeyContext.Provider>
    )}
  </ErrorBoundaryWithRetry>
);
