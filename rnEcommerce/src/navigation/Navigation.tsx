import React, {Suspense, useCallback, useEffect} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {commitLocalUpdate, useRelayEnvironment} from 'react-relay';

import {Home, Cart} from '../screens';
import {DynamicPressable, DynamicText, DynamicView} from '../components';
import {useHomeViewer} from '../screens/Home/Home';
import {HomeQuery} from '../__generated__/HomeQuery.graphql';

export type AppStackParamList = {
  Home: undefined;
  Cart: undefined;
};

const AppStack = createStackNavigator<AppStackParamList>();

const HomeHeader = () => {
  const {top} = useSafeAreaInsets();

  const {navigate} = useNavigation<StackNavigationProp<AppStackParamList>>();

  const viewer = useHomeViewer();

  const onCartPress = useCallback(() => {
    navigate('Cart');
  }, [navigate]);

  return (
    <DynamicView
      paddingTop={top + 16}
      backgroundColor="red"
      paddingHorizontal={16}
      paddingBottom={8}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <DynamicText color="#fff" fontWeight="bold">
        GROWSARI
      </DynamicText>
      <DynamicPressable
        borderRadius={4}
        borderWidth={1}
        padding={4}
        borderColor={'#fff'}
        onPress={onCartPress}>
        <DynamicText color="#fff" fontWeight="bold">
          Cart ({viewer?.cart?.length || 0})
        </DynamicText>
      </DynamicPressable>
    </DynamicView>
  );
};

const CartHeader = () => {
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation<StackNavigationProp<AppStackParamList>>();
  const viewer = useHomeViewer();

  const onBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <DynamicView
      paddingTop={top + 16}
      backgroundColor="red"
      paddingHorizontal={16}
      paddingBottom={8}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <DynamicPressable
        borderWidth={1}
        padding={4}
        borderRadius={4}
        borderColor={'#fff'}
        onPress={onBackPress}>
        <DynamicText color="#fff" fontWeight="bold">
          BACK
        </DynamicText>
      </DynamicPressable>
      <DynamicView padding={5}>
        <DynamicText color="#fff" fontWeight="bold">
          CART ({viewer?.cart?.length})
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );
};

const Navigation = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      options={{header: HomeHeader}}
      component={Home}
    />
    <AppStack.Screen
      name="Cart"
      options={{header: CartHeader}}
      component={Cart}
    />
  </AppStack.Navigator>
);

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
