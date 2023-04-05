import moment from 'moment';
import {useEffect, useState} from 'react';
import CalendarHelper from '../../helpers/calendarHelper';
import {StepDataPoint, getStepsHistory} from '../services/healthService';

export type StepsHistory = {[key: string]: DayStepDataPoint[]};

export interface DayStepDataPoint {
  date: string;
  value: number;
}

interface MonthData {
  date: string;
  data: DayStepDataPoint[];
}

type UseStepsHistoryHook = [
  moment.Moment,
  StepsHistory,
  boolean,
  () => void,
  () => void,
];

/**
 *
 * @param offset - Determines how many months around the current month should be loaded. Default is 0, so only the current month will be loaded.
 * @returns {UseStepsHistoryHook}
 */
const useStepsHistory = (offset: number = 0): UseStepsHistoryHook => {
  if (offset < 0) {
    throw 'offset cannot be < 0';
  } else if (offset > 10) {
    throw 'offset cannot be > 10';
  }

  const [month, setMonth] = useState(moment(24, 'HH').set('date', 1));

  const [stepsHistory, setStepsHistory] = useState<StepsHistory>({});
  const [isLoading, setIsLoading] = useState(false);

  const selectPreviousMonth = (): void =>
    setMonth(moment(month).subtract(1, 'month'));

  const selectNextMonth = (): void => setMonth(moment(month).add(1, 'month'));

  useEffect(() => {
    (async function () {
      const alreadyLoadedMonths = Object.keys(stepsHistory);
      const monthsOffsetArray = [...Array(offset).keys()];

      // Determine number of months to load.
      // If offset is '4', load 4 months before and after current month
      // and current month
      let monthsToLoad = [
        ...monthsOffsetArray
          .map(i => [
            moment(month)
              .subtract(i + 1, 'month')
              .format(CalendarHelper.DATE_FORMAT),
            moment(month)
              .add(i + 1, 'month')
              .format(CalendarHelper.DATE_FORMAT),
          ])
          .flat(),
        month.format(CalendarHelper.DATE_FORMAT),
      ];

      monthsToLoad = monthsToLoad.filter(
        (month: string) => !alreadyLoadedMonths.includes(month),
      );

      if (monthsToLoad.length) {
        setIsLoading(true);
      }

      const getMonthData = async (month: moment.Moment): Promise<MonthData> => {
        const startDate = (): moment.Moment =>
          moment(month).subtract(0, 'month');

        const endDate = (): moment.Moment => moment(month).add(1, 'month');

        const steps: StepDataPoint[] = await getStepsHistory(
          startDate().toISOString(),
          endDate().toISOString(),
        );

        let dayData: DayStepDataPoint[] = [];

        steps.forEach((step: StepDataPoint) => {
          let key: string = moment(step.startDate).format(
            CalendarHelper.DATE_FORMAT,
          );

          let data: DayStepDataPoint | undefined = dayData.find(
            day => day.date === key,
          );

          if (!data) {
            data = {
              date: key,
              value: 0,
            };
          }

          data.value = data.value + step.value;
          dayData.push(data);
        });

        const monthData: MonthData = {
          date: month.format(CalendarHelper.DATE_FORMAT),
          data: dayData,
        };

        return monthData;
      };

      const monthsData: MonthData[] = await Promise.all(
        monthsToLoad.map((month: string) => getMonthData(moment(month))),
      );

      const newHistory: StepsHistory = Object.fromEntries(
        monthsData.map(({date, data}) => [date, data]),
      );

      setStepsHistory(Object.assign({}, newHistory, stepsHistory));

      if (monthsToLoad.length) {
        setIsLoading(false);
      }
    })();
  }, [month]);

  return [month, stepsHistory, isLoading, selectPreviousMonth, selectNextMonth];
};

export default useStepsHistory;
