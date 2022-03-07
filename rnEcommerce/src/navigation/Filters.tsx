import {ScrollView, useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {commitLocalUpdate} from 'relay-runtime';
import {useRelayEnvironment} from 'react-relay';

import {
  DynamicAnimatedPressable,
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '../components';

import {HomeQuery} from '../__generated__/HomeQuery.graphql';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BrandsFilter from './BrandsFilter';
import CategoriesFilter from './CategoriesFilter';

interface FiltersProps {
  showFilter: boolean;
}

const Filters = ({showFilter}: FiltersProps) => {
  const environment = useRelayEnvironment();
  const {top, bottom} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const isMounted = useSharedValue(false);
  const animateHide = useSharedValue(false);

  const filterStyle = useAnimatedStyle(
    () => ({
      ...(isMounted.value && {
        transform: [
          {
            translateX: withTiming(showFilter ? width * 0.15 : width, {
              duration: 500,
            }),
          },
        ],
      }),
      opacity: withTiming(showFilter ? 1 : 0),
    }),
    [isMounted.value, showFilter, withTiming, width],
  );

  useEffect(() => {
    setTimeout(() => {
      animateHide.value = showFilter;
    }, 500);
  }, [showFilter, animateHide.value]);

  const overlayStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(showFilter ? 1 : 0, {duration: 500}),
      display: showFilter || animateHide.value ? 'flex' : 'none',
    }),
    [showFilter, animateHide.value, withTiming],
  );

  useEffect(() => {
    setTimeout(() => {
      isMounted.value = true;
    }, 500);
  }, []);

  const onPress = useCallback(() => {
    commitLocalUpdate(environment, store => {
      const viewerProxy = store
        .getRoot()
        .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

      if (viewerProxy) {
        viewerProxy.setValue(false, 'showFilter');
      }
    });
  }, [commitLocalUpdate, environment]);

  return (
    <>
      <DynamicAnimatedPressable
        onPress={onPress}
        position="absolute"
        zIndex={4}
        elevation={4}
        width="100%"
        height="100%"
        display="none"
        backgroundColor={'rgba(255, 255, 255, 0.4)'}
        style={overlayStyle}
      />
      <DynamicAnimatedView
        width="85%"
        height="100%"
        backgroundColor="#1f1d2b"
        flexDirection="row"
        position="absolute"
        zIndex={4}
        elevation={4}
        paddingTop={top}
        paddingBottom={bottom}
        padding={12}
        style={filterStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DynamicView>
            <DynamicText color={'#fff'} fontWeight="bold">
              PRICE
            </DynamicText>
            <DynamicView
              flexDirection="row"
              width="100%"
              marginTop={6}
              justifyContent="space-around">
              <DynamicPressable
                borderColor={'red'}
                borderWidth={1}
                borderRadius={4}
                paddingVertical={3}
                paddingHorizontal={6}
                flex={1}
                marginRight={6}
                alignItems="center">
                <DynamicText color={'#fff'} fontWeight="bold">
                  High to Low
                </DynamicText>
              </DynamicPressable>
              <DynamicPressable
                borderColor={'red'}
                borderWidth={1}
                borderRadius={4}
                paddingVertical={3}
                paddingHorizontal={6}
                flex={1}
                marginLeft={6}
                alignItems="center">
                <DynamicText color={'#fff'} fontWeight="bold">
                  Low to High
                </DynamicText>
              </DynamicPressable>
            </DynamicView>
          </DynamicView>
          <DynamicView marginTop={16}>
            <CategoriesFilter />
          </DynamicView>
          <DynamicView marginTop={16}>
            <BrandsFilter />
          </DynamicView>
        </ScrollView>
        <DynamicView
          position="absolute"
          width="100%"
          marginHorizontal={12}
          bottom={bottom}
          flexDirection="row"
          justifyContent="space-between"
          borderTopWidth={1}
          borderTopColor="red"
          backgroundColor="#1f1d2b"
          paddingVertical={12}>
          <DynamicView
            padding={6}
            alignItems="center"
            width="48%"
            backgroundColor={'red'}
            borderRadius={4}>
            <DynamicText fontWeight="bold" color="#fff">
              RESET
            </DynamicText>
          </DynamicView>
          <DynamicView
            padding={6}
            alignItems="center"
            width="48%"
            backgroundColor={'red'}
            borderRadius={4}>
            <DynamicText fontWeight="bold" color="#fff">
              APPLY
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicAnimatedView>
    </>
  );
};

export default Filters;
