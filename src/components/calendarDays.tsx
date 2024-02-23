import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment, {Moment} from 'moment';
import {getStepsHistory} from '../../services/healthService';
import {WEEK_DAYS} from '../Constants';

interface ICalendarDaysProps {
  currentDate: Moment;
  monthArray: Moment[][];
}

interface IDayProps {
  currentDate: Moment;
  dayDate: Moment;
  daySteps?: number;
}

const Day = ({currentDate, dayDate, daySteps}: IDayProps) => {
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
      <Text style={[styles.step, isFutureDay && styles.emptyStep]}>
        {daySteps?.toLocaleString() || '-'}
      </Text>
    </View>
  );
};

export const CalendarDays = ({currentDate, monthArray}: ICalendarDaysProps) => {
  const [monthSteps, setMonthSteps] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const getSteps = async () => {
      const firstDayOfMonth = moment(currentDate)
        .startOf('month')
        .format('YYYY-MM-DD');
      const firstDayOfNextMonth = moment(currentDate)
        .startOf('month')
        .add(1, 'month')
        .format('YYYY-MM-DD');
      setIsLoading(true);
      const stepsByMonth = await getStepsHistory(
        firstDayOfMonth,
        firstDayOfNextMonth,
      );

      if (isSubscribed) {
        const refactoSteps = stepsByMonth
          .map(x => ({
            date: x.startDate.split('T')[0],
            steps: x.value,
          }))
          .reduce<Record<string, number>>((acc, current) => {
            const {date, steps} = current;
            acc[date] = acc[date] ? acc[date] + steps : steps;
            return acc;
          }, {});

        setMonthSteps(refactoSteps);
        setIsLoading(false);
      }
    };
    getSteps();
    return () => {
      isSubscribed = false;
    };
  }, [currentDate]);

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
            {week.map(d => {
              const daySteps =
                monthSteps[moment(d).toISOString(true).split('T')[0]];
              return (
                <Day
                  key={d.toISOString()}
                  currentDate={currentDate}
                  dayDate={d}
                  daySteps={daySteps}
                />
              );
            })}
          </View>
        );
      })}
      {isLoading && (
        <Text style={[styles.loadingText, styles.step]}>
          Récupération des pas en cours ...
        </Text>
      )}
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
  loadingText: {
    marginTop: 24,
    textAlign: 'center',
  },
});
