import React, {Suspense} from 'react';
import {ActivityIndicator} from 'react-native';
import {graphql, useLazyLoadQuery, commitLocalUpdate} from 'react-relay';

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
      cart {
        ...ProductFragmentGraphQL_product
      }
      showFilter
      ...ProductsPagination_viewer
    }
  }
`;

// initialize local state

commitLocalUpdate(environment, store => {
  const viewerProxy = store
    .getRoot()
    .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

  viewerProxy.setLinkedRecords([], 'cart');
  viewerProxy.setLinkedRecords([], 'brandsFilters');
  viewerProxy.setLinkedRecords([], 'categoriesFilters');
  viewerProxy.setValue(false, 'showFilter');
  viewerProxy.setValue('', 'searchText');
});

const Home = () => {
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {});

  return (
    <ErrorBoundaryWithRetry
      fallback={({error, retry}) => (
        <DynamicView flex={1} alignItems="center" justifyContent="center">
          <DynamicText>{error}</DynamicText>
        </DynamicView>
      )}>
      {({fetchKey}) => {
        // If we have retried, use the new `retryQueryRef` provided
        // by the Error Boundary
        return (
          <Suspense
            fallback={
              <DynamicView flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="small" color="#868f99" />
              </DynamicView>
            }>
            {!!viewer && <Products viewer={viewer} />}
          </Suspense>
        );
      }}
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
