import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import ApplicationStyles from '../styles/ApplicationStyle';
import Metrics from '../styles/Metrics';
import { DayStep, WeekData } from '../Utils/types/types';

interface Props {
  weeks: WeekData[];
}

const CalendarWeekDays = (props: Props) => {
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
            <Text key={index} style={ApplicationStyles.boldText}>
              {day.toUpperCase()}.
            </Text>
          </View>
        ))}
      </View>

      {weeks.map((week: WeekData) => (
        <View
          key={week.key}
          style={[
            ApplicationStyles.rowContainer,
            {
              marginTop: Metrics.padding,
            },
          ]}>
          {week.days.map((day: DayStep) => (
            <View
              style={[
                ApplicationStyles.flex,
                ApplicationStyles.columnContainer,
                ApplicationStyles.fixedSizeDays,
              ]}>
              <Text
                key={day.dayNumber}
                style={[
                  ApplicationStyles.genericText,
                  day?.isDayAfter
                    ? ApplicationStyles.textAfterWeekDay
                    : ApplicationStyles.textWeekDay,
                ]}>
                {day.dayNumber}
              </Text>
              {!day?.isDayAfter && (
                <Text
                  style={[
                    ApplicationStyles.genericText,
                    ApplicationStyles.textStepHistory,
                  ]}>
                  {day.numberOfSteps}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CalendarWeekDays;
