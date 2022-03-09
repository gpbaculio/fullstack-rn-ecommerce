import {ScrollView, useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {commitLocalUpdate} from 'relay-runtime';
import {useRelayEnvironment} from 'react-relay';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  DynamicAnimatedPressable,
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '../../../components';

import BrandsFilter from './BrandsFilter';
import CategoriesFilter from './CategoriesFilter';
import PriceFilters from './PriceFilters';
import {HomeQuery} from '../../../__generated__/HomeQuery.graphql';

interface FiltersProps {
  showFilter: boolean;
}

const Filters = ({showFilter}: FiltersProps) => {
  const environment = useRelayEnvironment();
  const {bottom} = useSafeAreaInsets();
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
        paddingBottom={bottom}
        padding={12}
        style={filterStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PriceFilters />
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
          <DynamicPressable
            padding={6}
            alignItems="center"
            width="48%"
            backgroundColor={'red'}
            borderRadius={4}>
            <DynamicText fontWeight="bold" color="#fff">
              RESET
            </DynamicText>
          </DynamicPressable>
          <DynamicPressable
            padding={6}
            alignItems="center"
            width="48%"
            backgroundColor={'red'}
            borderRadius={4}>
            <DynamicText fontWeight="bold" color="#fff">
              APPLY
            </DynamicText>
          </DynamicPressable>
        </DynamicView>
      </DynamicAnimatedView>
    </>
  );
};

export default Filters;
