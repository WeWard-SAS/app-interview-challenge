import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import moment, {Moment} from 'moment';

interface ICalendarDaysProps {
  currentDate: Moment;
  monthArray: Moment[][];
}

interface IDayProps {
  currentDate: Moment;
  dayDate: Moment;
}

const WEEK_DAYS = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'];

const Day = ({currentDate, dayDate}: IDayProps) => {
  const isDayIsBeforeMonth = moment(dayDate).isBefore(
    moment(currentDate).startOf('month'),
  );
  const isDayIsAfterEndMonth = moment(dayDate).isAfter(
    moment(currentDate).endOf('month'),
  );
  const isFutureDay = moment(dayDate).isAfter(moment());

  if (isDayIsBeforeMonth || isDayIsAfterEndMonth) {
    return <View style={styles.emptyDay} />;
  }
  return (
    <View style={styles.stepsDayContainer}>
      <Text
        key={moment(dayDate).toISOString()}
        style={[styles.day, isFutureDay && styles.futureDay]}>
        {moment(dayDate).format('D')}
      </Text>
      <Text style={[styles.step, isFutureDay && styles.emptyStep]}>xxxx</Text>
    </View>
  );
};

export const CalendarDays = ({currentDate, monthArray}: ICalendarDaysProps) => {
  if (monthArray.length < 1) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.weekDayContainer}>
        {WEEK_DAYS.map(weekDay => {
          return (
            <Text key={weekDay} style={styles.weekDayText}>
              {weekDay}
            </Text>
          );
        })}
      </View>
      {monthArray.map((week, index) => {
        return (
          <View key={`${index}`} style={styles.weekContainer}>
            {week.map(d => (
              <Day
                key={d.toISOString()}
                currentDate={currentDate}
                dayDate={d}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  weekDayContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#687282',
  },
  weekContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  emptyDay: {
    flex: 1,
  },
  futureDay: {
    color: '#ADB7C5',
  },
  day: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: 8,
  },
  stepsDayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  step: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EE8651',
  },
  emptyStep: {
    display: 'none',
  },
});
