import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {FetchKeyContext, useHomeViewer} from './Home/Home';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../navigation/Navigation';

export type CartRouteProps = RouteProp<AppStackParamList, 'Cart'>;
const Cart = () => {
  const {fetchKey} = useRoute<CartRouteProps>().params;
  const viewer = useHomeViewer(fetchKey);

  return (
    <View>
      {viewer?.cart?.map((i, index) => {
        return <Text key={`cart:${i!.id}:${index}`}>{i?.display_name}</Text>;
      })}
    </View>
  );
};

export default Cart;
