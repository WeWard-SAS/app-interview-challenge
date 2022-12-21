import React from 'react';
import {Text, View} from 'react-native';

type CalendarDaysProps = {
  month: number;
  year: number;
};

export const CalendarDays = ({month, year}: CalendarDaysProps) => {
  const firstDay = new Date(year, month - 1, 1).getDay() - 1;

  const maxDays = new Date(year, month, 0).getDate();

  const calendarMatrix: (null | number)[][] = [];
  let counter = 1;
  calendarMatrix.push([]);

  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++) {
      calendarMatrix[row][col] = null;

      if (row === 1 && col >= firstDay) {
        calendarMatrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        calendarMatrix[row][col] = counter++;
      }
    }
  }

  return (
    <>
      {calendarMatrix.map(calendarMatrixWeek => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {calendarMatrixWeek.map(calendarMatrixDay => (
            <DateCalendar day={calendarMatrixDay} month={month} year={year} />
          ))}
        </View>
      ))}
    </>
  );
};

type DateCalendarProps = {
  month: number;
  year: number;
  day: number | null;
};

const DateCalendar = ({month, year, day}: DateCalendarProps) => {
  const isFutureDate = new Date() < new Date(year, month - 1, day || undefined);

  return (
    <View
      style={{
        margin: 1,
        height: 40,
        flex: 1,
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: isFutureDate ? 'gray' : 'black',
        }}>
        {day}
      </Text>
    </View>
  );
};
