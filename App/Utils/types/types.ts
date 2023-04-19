import { Moment } from 'moment';
import { StepDataPoint } from '../services/healthService';

export interface ControlsProps {
  month: string;
  updateDate: (date: Moment) => void;
  isLoading: boolean;
}

export type WeekData = {
  key: number;
  days: DayStep[];
};

export interface StepData {
  steps: StepDataPoint[];
  months: string;
  weeks: WeekData[];
}

export interface StepHistory {
  [date: string]: {
    startDate: string;
    endDate: string;
    value: number;
  };
}

export interface DayStep {
  dayNumber: string | number;
  key: number;
  isCurrentMonth: boolean;
  numberOfSteps?: string;
  isDayAfter: boolean;
}
