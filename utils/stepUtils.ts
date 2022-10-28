import {StepDataPoint} from '../services/healthService';
import moment from 'moment';

export type StepsByDays = {
  [dayNumber: number]: number;
};

export const formatStepsData = (steps: StepDataPoint[]) => {
  return steps.reduce((previousValue: StepsByDays, currentValue) => {
    const currentDay = moment(currentValue.startDate).date();
    return {
      ...previousValue,
      [currentDay]: (previousValue[currentDay] || 0) + currentValue.value,
    };
  }, {});
};
