import {Text, useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedDynamicElement, DynamicPressable} from '../components';
import {commitLocalUpdate} from 'relay-runtime';
import {useRelayEnvironment} from 'react-relay';
import {HomeQuery} from '../__generated__/HomeQuery.graphql';

interface FiltersProps {
  showFilter: boolean;
}

const Filters = ({showFilter}: FiltersProps) => {
  const {width} = useWindowDimensions();
  const isMounted = useSharedValue(false);
  const animateHide = useSharedValue(false);

  const filterStyle = useAnimatedStyle(
    () => ({
      ...(isMounted.value && {
        transform: [
          {
            translateX: withTiming(showFilter ? width * 0.3 : width, {
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
  }, [showFilter]);

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
  const environment = useRelayEnvironment();

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
      <Text>Filters</Text>
    </AnimatedDynamicElement>
  );
};

export default Filters;
