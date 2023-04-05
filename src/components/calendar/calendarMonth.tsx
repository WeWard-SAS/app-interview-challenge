import moment from 'moment';
import {StyleSheet, Text, View} from 'react-native';
import {DayStepDataPoint, StepsHistory} from '../../data/hooks/useStepsHistory';
import CalendarHelper from '../../helpers/calendarHelper';
import Theme from '../../theme/theme';

interface CalendarMonthInterface {
  date: moment.Moment;
  data: StepsHistory;
}

const CalendarMonth = (props: CalendarMonthInterface) => {
  const daysInMonth: number = props.date.daysInMonth();
  const monthOffset: number = props.date.day();

  const getDataForDay = (day: number): DayStepDataPoint | undefined => {
    const dateString: string = moment(props.date)
      .set('day', day)
      .format(CalendarHelper.DATE_FORMAT);

    const dayData = props.data[props.date.format(CalendarHelper.DATE_FORMAT)];
    return dayData?.find(d => d.date == dateString);
  };

  const formattedStepsValue = (stepsValue: number | undefined) => {
    if (!stepsValue) {
      return undefined;
    }

    return stepsValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <View style={styles.weeks}>
      {[...Array(CalendarHelper.MAX_WEEKS_PER_MONTH).keys()].map(w => {
        return (
          <View style={styles.days} key={w}>
            {[...Array(CalendarHelper.DAYS_PER_WEEK).keys()].map(d => {
              const dayIndex: number = w * CalendarHelper.DAYS_PER_WEEK + d + 1;

              const isDayVisible: boolean =
                dayIndex >= monthOffset &&
                dayIndex - monthOffset + 1 <= daysInMonth;

              const stepsValue: string | undefined = formattedStepsValue(
                getDataForDay(dayIndex)?.value,
              );

              return (
                <View
                  style={[
                    styles.day,
                    {
                      opacity: isDayVisible ? 1 : 0,
                    },
                  ]}
                  key={d}>
                  <Text
                    style={[styles.dayText, {opacity: stepsValue ? 1 : 0.4}]}>
                    {(dayIndex - monthOffset + 1).toString()}
                  </Text>

                  <Text
                    style={[
                      styles.dayValue,
                      {display: stepsValue ? 'flex' : 'none'},
                    ]}>
                    {stepsValue?.toLocaleString()}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
export default CalendarMonth;

const styles = StyleSheet.create({
  weeks: {
    paddingHorizontal: 24,
  },
  days: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  day: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    aspectRatio: 1 / 1,
  },
  dayText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 10,
    color: Theme.primaryColor,
  },
  dayValue: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: Theme.accentColor,
    marginTop: 4,
  },
});
