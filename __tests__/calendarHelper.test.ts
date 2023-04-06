import {getDailySteps} from '../components/calendarHelper';
import {StepDataPoint} from '../types';

describe('when we get the steps data', () => {
  describe('when we have valid steps history data', () => {
    const stepsHistory: StepDataPoint[] = [
      {
        endDate: '2023-02-02T01:00:00.000+01:00',
        startDate: '2023-02-02T00:00:00.000+01:00',
        value: 0,
      },
      {
        endDate: '2023-02-02T19:00:00.000+01:00',
        startDate: '2023-02-02T18:00:00.000+01:00',
        value: 123,
      },
      {
        endDate: '2023-02-02T20:00:00.000+01:00',
        startDate: '2023-02-02T19:00:00.000+01:00',
        value: 54,
      },
      {
        endDate: '2023-02-02T21:00:00.000+01:00',
        startDate: '2023-02-02T20:00:00.000+01:00',
        value: 12,
      },
      {
        endDate: '2023-02-02T23:00:00.000+01:00',
        startDate: '2023-02-02T22:00:00.000+01:00',
        value: 0,
      },
      {
        endDate: '2023-02-03T00:00:00.000+01:00',
        startDate: '2023-02-02T23:00:00.000+01:00',
        value: 5,
      },
      {
        endDate: '2023-02-03T01:00:00.000+01:00',
        startDate: '2023-02-03T00:00:00.000+01:00',
        value: 0,
      },
      {
        endDate: '2023-02-03T01:00:00.000+01:00',
        startDate: '2023-02-03T02:00:00.000+01:00',
        value: 123,
      },
    ];
    const dailySteps = getDailySteps(stepsHistory);
    it('we get some daily data back', () => {
      expect(dailySteps).toBeDefined();
      expect(dailySteps.size).toBeGreaterThan(0);
    });
    describe('for a given day', () => {
      const day = 2;
      const stepsForTheDay = dailySteps.get(day);
      it('we get the correct number of steps for the day', () => {
        const expectedResult = 123 + 54 + 12 + 5;
        expect(stepsForTheDay).toEqual(expectedResult);
      });
    });
  });
  describe('when we have invalid steps history data', () => {
    describe('when the step history is an empty array', () => {
      const emptyStepsHistory: StepDataPoint[] = [];
      const dailySteps = getDailySteps(emptyStepsHistory);
      it('we get an empty array for daily data', () => {
        expect(dailySteps).toBeDefined();
        expect(dailySteps.size).toEqual(0);
      });
    });
    describe('when the step history has a empty string for start date', () => {
      const incompletedStepsHistory: StepDataPoint[] = [
        {
          endDate: '2023-02-02T01:00:00.000+01:00',
          startDate: '2023-02-02T00:00:00.000+01:00',
          value: 0,
        },
        {
          endDate: '2023-02-02T19:00:00.000+01:00',
          startDate: '',
          value: 123,
        },
        {
          endDate: '2023-02-02T20:00:00.000+01:00',
          startDate: '2023-02-02T19:00:00.000+01:00',
          value: 54,
        },
        {
          endDate: '2023-02-02T21:00:00.000+01:00',
          startDate: '2023-02-02T20:00:00.000+01:00',
          value: 12,
        },
        {
          endDate: '2023-02-02T23:00:00.000+01:00',
          startDate: '2023-02-02T22:00:00.000+01:00',
          value: 0,
        },
        {
          endDate: '2023-02-03T00:00:00.000+01:00',
          startDate: '2023-02-02T23:00:00.000+01:00',
          value: 5,
        },
        {
          endDate: '2023-02-03T01:00:00.000+01:00',
          startDate: '2023-02-03T00:00:00.000+01:00',
          value: 0,
        },
        {
          endDate: '2023-02-03T01:00:00.000+01:00',
          startDate: '2023-02-03T02:00:00.000+01:00',
          value: 123,
        },
      ];
      const dailySteps = getDailySteps(incompletedStepsHistory);
      describe('for a given day', () => {
        const day = 2;
        const stepsForTheDay = dailySteps.get(day);
        it('we get some data', () => {
          expect(stepsForTheDay).toBeDefined();
        });
        it('we get the correct number of steps', () => {
          const expectedResult = 54 + 12 + 5;
          expect(stepsForTheDay).toEqual(expectedResult);
        });
      });
    });
  });
});
