import React from 'react';
import Animated from 'react-native-reanimated';

class DynamicClassWrapper extends React.Component<{
  dynamicElement: React.ReactNode;
}> {
  render(): React.ReactNode {
    return this.props.dynamicElement;
  }
}

export default Animated.createAnimatedComponent(DynamicClassWrapper);
