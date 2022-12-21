import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getStepsHistory} from '../services/healthService';
import {isFutureDate} from './utile';

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
  const isTheDateInTheFuture = day ? isFutureDate({month, year, day}) : false;

  const [dataToDisplayInDate, setDataToDisplayInDate] = useState('');

  const getDataToDisplay = useCallback(
    async (_year: number, _month: number, _day: number) => {
      console.log(`${_year}-${_month}-${_day}`);

      if (isFutureDate({year: _year, month: _month, day: _day})) {
        return '';
      }
      const steps = await getStepsHistory(
        `${_year}-${_month}-${_day}`,
        `${_year}-${_month}-${_day + 1}`,
      );

      const sum = steps.reduce(
        (partialSum, step) => partialSum + step.value,
        0,
      );

      return '' + sum;
    },
    [],
  );

  useEffect(() => {
    (async () => {
      if (day) {
        const data = await getDataToDisplay(year, month, day);
        setDataToDisplayInDate(data);
      }
    })();

    return () => {
      setDataToDisplayInDate('');
    };
  }, [year, month, day, getDataToDisplay]);

  return (
    <View
      style={{
        margin: 1,
        height: 40,
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: isTheDateInTheFuture ? 'gray' : 'black',
        }}>
        {day}
      </Text>
      {dataToDisplayInDate && (
        <Text style={{textAlign: 'center', color: '#FF6700'}}>
          {dataToDisplayInDate}
        </Text>
      )}
    </View>
  );
};
