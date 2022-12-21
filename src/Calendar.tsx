import React from 'react';
import {CalendarDays} from './CalendarDays';
import {CalendarHeader} from './CalendarHeader';

type CalendarProps = {
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
};
export const Calendar = ({month, year, setMonth, setYear}: CalendarProps) => {
  return (
    <>
      <CalendarHeader
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
      <CalendarDays month={month} year={year} />
    </>
  );
};
