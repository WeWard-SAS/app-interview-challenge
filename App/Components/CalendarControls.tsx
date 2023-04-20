import moment from 'moment';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ControlsProps } from '../Utils/types/types';

import Metrics from '../styles/Metrics';
import ApplicationStyles from '../styles/ApplicationStyle';

const CalendarControls = (props: ControlsProps) => {
  const { testID, month, updateDate, isLoading } = props;

  return (
    <View testID={testID} style={ApplicationStyles.rowContainer}>
      <Text
        style={[ApplicationStyles.genericText, ApplicationStyles.monthText]}>
        {moment(month, 'YYYY MM')
          .format('MMMM YYYY')
          .replace(/\b(\w)/g, c => c.toUpperCase())}
      </Text>
      <View style={ApplicationStyles.rowContainer}>
        <TouchableOpacity
          disabled={isLoading}
          style={{ marginRight: Metrics.doublePadding }}
          onPress={() =>
            updateDate(moment(month, 'YYYY MM').subtract(1, 'month'))
          }>
          <Image
            style={ApplicationStyles.smallIcon}
            source={require('../assets/left-chevron.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => updateDate(moment(month, 'YYYY MM').add(1, 'month'))}>
          <Image
            style={ApplicationStyles.smallIcon}
            source={require('../assets/right-chevron.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarControls;
