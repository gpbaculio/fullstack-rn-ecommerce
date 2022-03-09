import React, {Suspense, useContext} from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';

import {Home, Cart} from '../screens';
import {DynamicPressable, DynamicText, DynamicView} from '../components';
import {FetchKeyContext, useHomeViewer} from '../screens/Home/Home';
import {useNavigation} from '@react-navigation/native';

export type AppStackParamList = {
  Home: undefined;
  Cart: {
    fetchKey: number;
  };
};

const AppStack = createStackNavigator<AppStackParamList>();

const Navigation = () => {
  return (
    <>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => {
              const {top} = useSafeAreaInsets();
              const fetchKey = useContext(FetchKeyContext);
              const navigation =
                useNavigation<StackNavigationProp<AppStackParamList>>();
              const viewer = useHomeViewer(fetchKey);
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
                    onPress={() => {
                      navigation.navigate('Cart', {
                        fetchKey,
                      });
                    }}>
                    <DynamicText color="#fff" fontWeight="bold">
                      Cart ({viewer?.cart?.length})
                    </DynamicText>
                  </DynamicPressable>
                </DynamicView>
              );
            },
          }}
        />
        <AppStack.Screen
          options={{
            header: () => {
              const {top} = useSafeAreaInsets();
              const fetchKey = useContext(FetchKeyContext);
              const navigation =
                useNavigation<StackNavigationProp<AppStackParamList>>();
              const viewer = useHomeViewer(fetchKey);
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
                    onPress={() => {
                      navigation.goBack();
                    }}>
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
            },
          }}
          name="Cart"
          component={Cart}
        />
      </AppStack.Navigator>
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
