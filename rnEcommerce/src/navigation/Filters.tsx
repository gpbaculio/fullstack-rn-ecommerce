import {useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {commitLocalUpdate} from 'relay-runtime';
import {useRelayEnvironment} from 'react-relay';

import {
  AnimatedDynamicElement,
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
    [isMounted.value, showFilter],
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
    [showFilter, animateHide.value],
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
    <AnimatedDynamicElement
      style={overlayStyle}
      dynamicElement={
        <DynamicPressable
          onPress={onPress}
          position="absolute"
          zIndex={4}
          elevation={4}
          width="100%"
          height="100%"
          display="none"
          backgroundColor={'rgba(255, 255, 255, 0.4)'}
        />
      }>
      <AnimatedDynamicElement
        style={filterStyle}
        dynamicElement={
          <DynamicView
            width="85%"
            height="100%"
            backgroundColor="#1f1d2b"
            flexDirection="row"
            position="absolute"
            zIndex={4}
            elevation={4}
            paddingTop={top}
            paddingBottom={bottom}
            padding={12}>
            <DynamicView width="100%">
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
                <DynamicText color={'#fff'} fontWeight="bold">
                  DATE ADDED
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
                      Oldest
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
                      Newest
                    </DynamicText>
                  </DynamicPressable>
                </DynamicView>
              </DynamicView>
              <DynamicView marginTop={16}>
                <CategoriesFilter />
              </DynamicView>
              <DynamicView marginTop={16}>
                <DynamicText color={'#fff'} fontWeight="bold">
                  BRANDS
                </DynamicText>
                <BrandsFilter />
              </DynamicView>
            </DynamicView>
          </DynamicView>
        }
      />
    </AnimatedDynamicElement>
  );
};

export default Filters;
