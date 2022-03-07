import {View, Text, TextStyle, TextProps, StyleProp} from 'react-native';
import React from 'react';

const DynamicText = ({
  children,
  color,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  textAlign,
  textDecorationLine,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
  textTransform,
  fontVariant,
  letterSpacing,
  textDecorationColor,
  textDecorationStyle,
  writingDirection,
  textAlignVertical,
  includeFontPadding,
  ...rest
}: TextStyle & TextProps) => (
  <Text
    style={
      {
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        lineHeight,
        textAlign,
        textDecorationLine,
        textShadowColor,
        textShadowOffset,
        textShadowRadius,
        textTransform,
        fontVariant,
        letterSpacing,
        textDecorationColor,
        textDecorationStyle,
        writingDirection,
        textAlignVertical,
        includeFontPadding,
      } as StyleProp<TextStyle>
    }
    {...rest}>
    {children}
  </Text>
);

export default DynamicText;
