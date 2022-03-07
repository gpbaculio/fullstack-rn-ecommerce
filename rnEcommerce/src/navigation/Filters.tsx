import {Text, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DynamicPressable} from '../components';
import {commitLocalUpdate} from 'relay-runtime';
import {useRelayEnvironment} from 'react-relay';
import {HomeQuery} from '../__generated__/HomeQuery.graphql';

class DynamicPressableClass extends React.Component<{onPress: () => void}> {
  render(): React.ReactNode {
    return (
      <DynamicPressable
        onPress={this.props.onPress}
        position="absolute"
        zIndex={4}
        elevation={4}
        width="100%"
        height="100%"
        display="none"
        backgroundColor={'rgba(255, 255, 255, 0.4)'}
      />
    );
  }
}

const AnimatedDynamicPressable = Animated.createAnimatedComponent(
  DynamicPressableClass,
);

interface FiltersProps {
  showFilter: boolean;
}

const Filters = ({showFilter}: FiltersProps) => {
  const {width} = useWindowDimensions();
  const isMounted = useSharedValue(false);

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

  const animateHide = useSharedValue(false);

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

  const onPress = () => {
    commitLocalUpdate(environment, store => {
      const viewerProxy = store
        .getRoot()
        .getLinkedRecord<HomeQuery['response']['viewer']>('viewer');

      if (viewerProxy) {
        viewerProxy.setValue(false, 'showFilter');
      }
    });
  };

  return (
    <AnimatedDynamicPressable onPress={onPress} style={overlayStyle}>
      <Text>Filters</Text>
    </AnimatedDynamicPressable>
  );
};

export default Filters;
