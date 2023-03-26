import {FormattedStepsType, MatrixType} from './types.d';
import {weekDays, nDays} from './constants';
import {StepDataPoint} from '../../../services/healthService';

export function formatSteps(steps: StepDataPoint[]) {
  let formattedSteps: FormattedStepsType = {};

  for (const step of steps) {
    const key = new Date(step.startDate).getDate();
    if (key in formattedSteps) {
      formattedSteps[key] = formattedSteps[key] + step.value;
    } else {
      formattedSteps[key] = step.value;
    }
  }

  return formattedSteps;
}

export function generateMatrix(
  activeDate: Date,
  formattedSteps: FormattedStepsType,
) {
  let matrix: MatrixType = [];
  matrix[0] = weekDays;

  let year = activeDate.getFullYear();
  let month = activeDate.getMonth();
  let firstDay = new Date(year, month, 1).getDay() - 1;

  let maxDays = nDays[month];
  if (month === 1) {
    // February
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      maxDays += 1;
    }
  }

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;
      if ((row === 1 && col >= firstDay) || (row > 1 && counter <= maxDays)) {
        // Fill in rows only after the first day of the month
        matrix[row][col] = {
          steps: formattedSteps[counter],
          day: counter++,
        };
      }
    }
  }

  return matrix;
}
