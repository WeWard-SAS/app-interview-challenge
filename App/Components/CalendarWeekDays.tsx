import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import ApplicationStyles from '../styles/ApplicationStyle';
import Metrics from '../styles/Metrics';

const CalendarWeekDays = props => {
  const { weeks } = props;

  return (
    <View>
      <View
        style={[
          ApplicationStyles.rowContainer,
          {
            marginTop: Metrics.padding,
          },
        ]}>
        {moment.weekdaysShort().map((day: string, index: number) => (
          <View
            style={[ApplicationStyles.flex, ApplicationStyles.columnContainer]}>
            <Text key={index}>{day.toUpperCase()}.</Text>
          </View>
        ))}
      </View>

      {weeks.map(week => (
        <View
          key={week.key}
          style={[
            ApplicationStyles.rowContainer,
            { marginTop: Metrics.padding },
          ]}>
          {week.days.map(day => (
            <View
              style={[
                ApplicationStyles.flex,
                ApplicationStyles.columnContainer,
              ]}>
              <Text
                key={day.dayNumber}
                style={[
                  ApplicationStyles.genericText,
                  ApplicationStyles.textWeekDay,
                ]}>
                {day.dayNumber}
              </Text>
              <Text
                style={[
                  ApplicationStyles.genericText,
                  ApplicationStyles.textStepHistory,
                ]}>
                {day.numberOfSteps}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CalendarWeekDays;
