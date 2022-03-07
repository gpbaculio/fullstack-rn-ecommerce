import React, {Suspense, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  graphql,
  useLazyLoadQuery,
  commitLocalUpdate,
  useRelayEnvironment,
} from 'react-relay';
import {ErrorBoundaryWithRetry} from '../../components';
import DynamicText from '../../components/DynamicText';
import DynamicView from '../../components/DynamicView';
import {HomeQuery} from '../../__generated__/HomeQuery.graphql';
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

const Home = () => {
  const {viewer} = useLazyLoadQuery<HomeQuery>(HomeQueryGraphQL, {});
  const environment = useRelayEnvironment();

  useEffect(() => {
    // initialize local state
    commitLocalUpdate(environment, store => {
      const viewerProxy = store
        .getRoot()
        .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');
      if (
        viewerProxy.getLinkedRecords('cart') === undefined &&
        viewerProxy.getLinkedRecord('showFilter') === undefined
      ) {
        viewerProxy.setLinkedRecords([], 'cart');
        viewerProxy.setValue(false, 'showFilter');
      }
    });
  }, [environment, viewer?.cart, viewer?.showFilter]);

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
