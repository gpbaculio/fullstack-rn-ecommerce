import React from 'react';
import Animated from 'react-native-reanimated';

class DynamicClassWrapper extends React.Component<{
  dynamicElement: React.ReactNode;
  children?: React.ReactNode;
}> {
  render(): React.ReactNode {
    return (
      <>
        {this.props.dynamicElement}
        {!!this.props.children && this.props.children}
      </>
    );
  }
}

export default Animated.createAnimatedComponent(DynamicClassWrapper);
