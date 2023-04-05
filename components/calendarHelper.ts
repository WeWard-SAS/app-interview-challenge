import moment from 'moment';
import {StepDataPoint, StepsData} from '../types';

export const getDailySteps = (stepsHistory: StepDataPoint[]) => {
  const stepsMap: StepsData = new Map();

  stepsHistory.forEach(stepHistoryItem => {
    if (stepHistoryItem.startDate) {
      const day = moment(stepHistoryItem.startDate).day();
      if (stepsMap.has(day)) {
        let currentDailySteps = stepsMap.get(day);
        if (!currentDailySteps) {
          currentDailySteps = 0;
        }
        const stepsToAdd = stepHistoryItem.value ? stepHistoryItem.value : 0;
        const updatedSteps = currentDailySteps + stepsToAdd;
        stepsMap.set(day, updatedSteps);
      } else {
        const steps = stepHistoryItem.value ? stepHistoryItem.value : 0;
        stepsMap.set(day, steps);
      }
    }
  });

  return stepsMap;
};
