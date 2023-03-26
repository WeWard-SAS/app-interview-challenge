export interface CalendarDataPoint {
  day: number;
  steps: number;
}

export type StringOrNumberOrCalendarDataPoint =
  | string
  | CalendarDataPoint
  | number;

export type MatrixType = StringOrNumberOrCalendarDataPoint[][];

export type FormattedStepsType = Record<number, number>;
