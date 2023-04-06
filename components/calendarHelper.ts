import moment from 'moment';
import {StepsData, StepDataPoint} from '../types';
import {DAYS_OF_WEEK} from '../Constants';

export const getDailySteps = (stepsHistory: StepDataPoint[]) => {
  const stepsMap: StepsData = new Map();

  stepsHistory.forEach(stepHistoryItem => {
    if (stepHistoryItem.startDate) {
      const day = moment(stepHistoryItem.startDate).date();
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

export const getMatrix = (startDate: Date) => {
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const numberOfDaysInMonth = moment(startDate).daysInMonth();

  let calendarMatrix: (number | string)[][] = [];
  calendarMatrix[0] = DAYS_OF_WEEK;

  let day = 1;
  for (let row = 1; row < 7; row++) {
    calendarMatrix[row] = [];
    for (let col = 0; col < 7; col++) {
      calendarMatrix[row][col] = -1;
      if (row === 1 && col >= firstDayOfMonth) {
        calendarMatrix[row][col] = day++;
      } else if (row > 1 && day <= numberOfDaysInMonth) {
        calendarMatrix[row][col] = day++;
      }
    }
  }

  return calendarMatrix;
};
