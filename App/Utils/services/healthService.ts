import moment, { Moment } from 'moment';

export interface StepDataPoint {
  startDate: string; // une string ISO 8601
  endDate: string; // une string ISO 8601
  value: number;
}

export async function getStepsHistory(startDate: string, endDate: string) {
  const mStartDate = moment(startDate);
  const mEndDate = moment(endDate);
  const steps: StepDataPoint[] = [];
  const bucketInterval = 1;
  const bucketPeriod = 'hour';

  // Add random latency to simulate a long running task
  await new Promise(resolve =>
    setTimeout(() => resolve(undefined), 500 + Math.random() * 3000),
  );

  while (mStartDate.isBefore(mEndDate)) {
    steps.push({
      value:
        mStartDate.hour() > 7 && mStartDate.hour() < 21
          ? Math.floor(Math.random() * 1200)
          : 0,
      startDate: mStartDate.clone().toISOString(true),
      endDate: mStartDate.add(bucketInterval, bucketPeriod).toISOString(true),
    });
  }

  mStartDate.add(bucketInterval, bucketPeriod);

  return steps;
}

export function isDayAfter(date: Moment) {
  return date.isAfter(moment.now());
}
