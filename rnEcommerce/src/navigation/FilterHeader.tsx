import React from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '../components';

interface FilterHeaderProps {
  title: string;
  length: number | undefined;
  showHandlerText: string;
  onShowHandlerPress: () => void;
}

const FilterHeader = ({
  title,
  length,
  showHandlerText,
  onShowHandlerPress,
}: FilterHeaderProps) => (
  <DynamicView flexDirection="row" justifyContent="space-between">
    <DynamicText color={'#fff'} fontWeight="bold" marginBottom={8}>
      {title} ({length})
    </DynamicText>
    <DynamicPressable zIndex={6} onPress={onShowHandlerPress}>
      <DynamicText color={'#fff'} fontWeight="bold" marginBottom={8}>
        {showHandlerText}
      </DynamicText>
    </DynamicPressable>
  </DynamicView>
);

export default FilterHeader;
