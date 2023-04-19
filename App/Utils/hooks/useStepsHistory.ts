import { useEffect, useState } from 'react';
import { getStepsHistory, isDayAfter } from '../services/healthService';
import moment from 'moment';
import { NativeModules, Platform } from 'react-native';
import { DayStep, StepData, StepHistory, WeekData } from '../types/types';

const isAndroid = Platform.OS === 'android';
const locales = isAndroid
  ? NativeModules.I18nManager.localeIdentifier
  : NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0];

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
        const weeks: WeekData[] = [];

        // Mapping the weeks
        for (let week = 0; week < weeksInMonth; week++) {
          const days: DayStep[] = [];

          // Mapping the days
          for (let day = 0; day < 7; day++) {
            const dayIndex = week * 7 + day - firstDayOfMonth + 1;

            // If day part of the month, pushing steps and index
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
              days.push({
                key: dayIndex,
                dayNumber: dayIndex,
                isCurrentMonth: true,
                numberOfSteps: isDayAfter(
                  moment(`${currentMonth} ${dayIndex}`, 'YYYY MM D'),
                )
                  ? '300'
                  : groupedStepsData
                      .find(item => moment(item.startDate).date() === dayIndex)
                      ?.value.toLocaleString(locales.split('_')[0], {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                        useGrouping: true,
                      }),
                isDayAfter: isDayAfter(
                  moment(`${currentMonth} ${dayIndex}`, 'YYYY MM D'),
                ),
              });
            } else {
              days.push({
                key: dayIndex,
                dayNumber: '',
                numberOfSteps: '',
                isCurrentMonth: false,
                isDayAfter: isDayAfter(
                  moment(`${currentMonth} ${dayIndex}`, 'YYYY MM D'),
                ),
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
