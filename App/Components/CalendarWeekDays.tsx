import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';

import ApplicationStyles from '../styles/ApplicationStyle';
import Metrics from '../styles/Metrics';
import { DayStep, WeekData } from '../Utils/types/types';

interface Props {
  weeks: WeekData[];
  testID: string;
}

const CalendarWeekDays = (props: Props) => {
  const { weeks, testID } = props;
  moment.updateLocale('fr', {
    weekdaysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  });

  return (
    <View testID={testID}>
      <View
        style={[
          ApplicationStyles.rowContainer,
          {
            marginTop: Metrics.padding,
          },
        ]}>
        {moment
          .localeData('fr')
          .weekdaysShort()
          .map((day: string, index: number) => (
            <View
              key={index}
              style={[
                ApplicationStyles.flex,
                ApplicationStyles.columnContainer,
              ]}>
              <Text style={ApplicationStyles.boldText}>
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
          {week.days.map((day: DayStep, index: number) => (
            <View
              key={index}
              style={[
                ApplicationStyles.flex,
                ApplicationStyles.columnContainer,
                ApplicationStyles.fixedSizeDays,
              ]}>
              <Text
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
