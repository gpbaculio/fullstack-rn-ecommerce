import React, {Suspense, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  graphql,
  useLazyLoadQuery,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';

import {useHome} from '../../../store/home';

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

export const useHomeViewer = () => {
  const {state} = useHome();
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {
    fetchKey: state.fetchKey,
  });
  return viewer;
};

const Home = ({fetchKey}: {fetchKey: number}) => {
  const {dispatch, actions} = useHome();

  // watch fetchKey changes
  useEffect(() => {
    dispatch(actions.setFetchKey(fetchKey));
  }, [fetchKey, dispatch, actions]);

  const environment = useRelayEnvironment();

  // initialize local state
  useEffect(() => {
    commitLocalUpdate(environment, store => {
      const viewerProxy = store
        .getRoot()
        .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');
      if (viewerProxy) {
        const cartProxy = viewerProxy.getValue('cart');
        const brandsFiltersProxy = viewerProxy.getValue('brandsFilters');
        const categoriesFiltersProxy =
          viewerProxy.getValue('categoriesFilters');
        const showFilterProxy = viewerProxy.getValue('showFilter');
        const searchTextProxy = viewerProxy.getValue('searchText');
        const sortPriceProxy = viewerProxy.getValue('sortPrice');
        const shouldRefetchProxy = viewerProxy.getValue('shouldRefetch');

        if (
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
      }
    });
  }, [commitLocalUpdate, environment]);

  const viewer = useHomeViewer();

  return (
    <>
      <Filters showFilter={!!viewer?.showFilter} />
      <Suspense
        fallback={
          <DynamicView flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="#868f99" />
          </DynamicView>
        }>
        <Products viewer={viewer as ProductsPagination_viewer$key} />
      </Suspense>
    </>
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
    {({fetchKey}) => {
      return <Home fetchKey={fetchKey} />;
    }}
  </ErrorBoundaryWithRetry>
);
