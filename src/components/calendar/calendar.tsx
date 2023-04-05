import {weekdaysShort} from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useStepsHistory from '../../data/hooks/useStepsHistory';
import CalendarHelper from '../../helpers/calendarHelper';
import Theme from '../../theme/theme';
import CalendarHeader from './calendarHeader';
import CalendarMonth from './calendarMonth';

const Calendar = () => {
  const [
    month,
    currentMonthHistory,
    isLoading,
    selectPreviousMonth,
    selectNextMonth,
  ] = useStepsHistory();

  // Sets first day of week to Monday
  const weekdays: string[] = [
    ...Array(CalendarHelper.DAYS_PER_WEEK).keys(),
  ].map(k => weekdaysShort(k + 1));

  return (
    <View style={styles.container}>
      <CalendarHeader
        month={month}
        isLoading={isLoading}
        selectPreviousMonth={selectPreviousMonth}
        selectNextMonth={selectNextMonth}
      />

      <View style={styles.separator} />

      <View style={styles.weekdays}>
        {weekdays.map(w => (
          <Text style={styles.weekday} key={w}>
            {w}
          </Text>
        ))}
      </View>

      <CalendarMonth date={month} data={currentMonthHistory} />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {},

  separator: {
    height: 1,
    backgroundColor: Theme.separatorColor,
    marginHorizontal: 20,
  },
  weekdays: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: Theme.secondaryColor,
  },
});
