import { useEffect, useState } from 'react';
import { getStepsHistory, StepDataPoint } from '../services/healthService';
import moment from 'moment';

type WeekData = {
  key: number;
  days: {
    dayNumber: string | number;
    isCurrentMonth: boolean;
  }[];
};

interface StepData {
  steps: StepDataPoint[];
  months: string;
  weeks: WeekData[];
}

interface StepHistory {
  [date: string]: {
    startDate: string;
    endDate: string;
    value: number;
  };
}

// Current Month will have this format 'YYYY MM'
const useStepsHistory = (currentMonth: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StepData>();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const steps = await getStepsHistory(
          moment(currentMonth, 'YYYY MM').format('YYYY-MM-DD'),
          moment(currentMonth, 'YYYY MM').add(1, 'month').format('YYYY-MM-DD'),
        );
        const result = steps.reduce((acc: StepHistory, curr) => {
          // Formatting the date
          const date = moment(curr.startDate).format('YYYY-MM-DD');

          // Checking if others values exisiting
          if (!acc[date]) {
            // Creating a new entries if not
            acc[date] = {
              startDate: curr.startDate,
              endDate: curr.endDate,
              value: curr.value,
            };
          } else {
            // Updating value (steps) if yes
            acc[date].value += curr.value;
          }

          return acc;
        }, {});

        const groupedStepsData = Object.values(result);
        const daysInMonth = moment(currentMonth, 'YYYY MM').daysInMonth();
        const firstDayOfMonth = moment(currentMonth, 'YYYY MM')
          .startOf('month')
          .day();

        const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
        const weeks = [];

        // Mapping the weeks
        for (let week = 0; week < weeksInMonth; week++) {
          const days = [];

          // Mapping the days
          for (let day = 0; day < 7; day++) {
            const dayIndex = week * 7 + day - firstDayOfMonth + 1;

            // If day part of the month, pushing steps and index
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
              days.push({
                dayNumber: dayIndex,
                isCurrentMonth: true,
                numberOfSteps: groupedStepsData.find(
                  item => moment(item.startDate).date() === dayIndex,
                )?.value,
              });
            } else {
              days.push({
                dayNumber: '',
                isCurrentMonth: false,
              });
            }
          }

          // Updating array with steps values
          weeks.push({
            key: week,
            days: days,
          });
        }

        setData({ steps, months: currentMonth, weeks });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [currentMonth]);

  return { data, error, loading };
};

export default useStepsHistory;
