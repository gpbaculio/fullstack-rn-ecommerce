import React, {Suspense} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {graphql, useLazyLoadQuery} from 'react-relay';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';

import {Home, Product} from '../screens';
import {DynamicText, DynamicView} from '../components';

import {NavigationQuery} from '../__generated__/NavigationQuery.graphql';
import Filters from '../screens/Home/Filters';

export type AppStackParamList = {
  Home: undefined;
  Product: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

const NavigationGraphQLQuery = graphql`
  query NavigationQuery {
    viewer {
      showFilter
    }
  }
`;

const Navigation = () => {
  const {viewer} = useLazyLoadQuery<NavigationQuery>(
    NavigationGraphQLQuery,
    {},
  );
  return (
    <>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => {
              const {top} = useSafeAreaInsets();
              return (
                <DynamicView
                  paddingTop={top + 16}
                  backgroundColor="red"
                  paddingHorizontal={16}
                  paddingBottom={8}
                  flexDirection="row"
                  justifyContent="space-between">
                  <DynamicText color="#fff" fontWeight="bold">
                    GROWSARI
                  </DynamicText>
                  <DynamicText color="#fff" fontWeight="bold">
                    Cart
                  </DynamicText>
                </DynamicView>
              );
            },
          }}
        />
        <AppStack.Screen name="Product" component={Product} />
      </AppStack.Navigator>
      <Filters showFilter={!!viewer?.showFilter} />
    </>
  );
};

export default () => (
  <Suspense
    fallback={
      <DynamicView flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#868f99" />
      </DynamicView>
    }>
    <Navigation />
  </Suspense>
);
