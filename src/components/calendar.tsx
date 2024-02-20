import React, {useCallback, useState, useMemo} from 'react';
import {View} from 'react-native';
import {CalendarHeader} from './calendarHeader';
import moment from 'moment';
import {CalendarDays} from './calendarDays';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const firstCalendarDate = moment(currentDate)
    .startOf('month')
    .startOf('isoWeek');
  const lastCalendarDate = moment(currentDate).endOf('month');

  const monthArray = useMemo(() => {
    const startWeekDate = firstCalendarDate.clone().subtract(1, 'day');
    const calendarArray = [];
    while (startWeekDate.isBefore(lastCalendarDate, 'day')) {
      calendarArray.push(
        Array(7)
          .fill(0)
          .map(() => startWeekDate.add(1, 'day').clone()),
      );
    }
    return calendarArray;
  }, [firstCalendarDate, lastCalendarDate]);

  const onPressPreviousMonth = useCallback(() => {
    setCurrentDate(moment(currentDate).subtract(1, 'month'));
  }, [currentDate]);

  const onPressNextMonth = useCallback(() => {
    if (moment(currentDate).unix() >= moment().subtract(1, 'month').unix()) {
      return;
    }
    setCurrentDate(moment(currentDate).add(1, 'month'));
  }, [currentDate]);

  return (
    <View>
      <CalendarHeader
        month={moment(currentDate).format('MMMM YYYY')}
        onPressLeft={onPressPreviousMonth}
        onPressRight={onPressNextMonth}
      />
      <CalendarDays currentDate={currentDate} monthArray={monthArray} />
    </View>
  );
};
