import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {FetchKeyContext, useHomeViewer} from './Home/Home';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../navigation/Navigation';
import {DynamicPressable, DynamicText, DynamicView} from '../components';

export type CartRouteProps = RouteProp<AppStackParamList, 'Cart'>;
const Cart = () => {
  const {fetchKey} = useRoute<CartRouteProps>().params;
  const viewer = useHomeViewer(fetchKey);

  return (
    <DynamicView padding={16}>
      {viewer?.cart?.map((node, index) => {
        return (
          <DynamicView
            key={`cart:${index}:${node?.id}`}
            paddingVertical={6}
            borderWidth={0.5}
            borderColor="red"
            borderRadius={4}
            marginBottom={6}>
            <DynamicView
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal={8}>
              <DynamicText textAlign="center" fontWeight="bold" color="red">
                Category: {node?.category}
              </DynamicText>
              <DynamicText textAlign="center" fontWeight="bold" color="red">
                Brand: {node?.brand}
              </DynamicText>
            </DynamicView>
            <DynamicView marginVertical={3}>
              <DynamicText textAlign="center" fontWeight="bold" color="red">
                {node?.display_name}
              </DynamicText>
            </DynamicView>
            <DynamicView
              marginHorizontal={8}
              flexDirection="row"
              justifyContent="space-between">
              <DynamicText fontWeight="bold" color="red">
                Price: {node?.price}
              </DynamicText>
            </DynamicView>
          </DynamicView>
        );
      })}
      <DynamicPressable
        width="100%"
        backgroundColor="red"
        marginTop={8}
        borderRadius={4}
        marginBottom={36}
        paddingVertical={8}>
        <DynamicText textAlign="center" color={'#fff'} fontWeight="bold">
          CHECKOUT
        </DynamicText>
      </DynamicPressable>
    </DynamicView>
  );
};

export default Cart;
