import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {CustomDayCell} from './CustomDayCell';
import {formatNumberWithSpaces} from '../../utils/numberUtils';
import {getLocaleDays, getLocaleMonths} from '../../utils/dateUtils';
import {StepsByDays} from '../../utils/stepUtils';

interface CustomCalendarProps {
  isLoading: boolean;
  activeDate: moment.Moment;
  onDateChange: (date: moment.Moment) => void;
  stepDays: StepsByDays;
}
export const CustomCalendar: FunctionComponent<CustomCalendarProps> = ({
  isLoading,
  activeDate,
  onDateChange,
  stepDays,
}) => {
  const months = getLocaleMonths('fr-FR');

  const decrementMonth = useCallback(() => {
    onDateChange(moment(activeDate).add(-1, 'month'));
  }, [activeDate, onDateChange]);

  const incrementMonth = useCallback(() => {
    onDateChange(moment(activeDate).add(1, 'month'));
  }, [activeDate, onDateChange]);

  const matrix = useMemo(() => {
    const firstDay = moment(activeDate).startOf('month').get('day');
    const daysInMonth = activeDate.daysInMonth();

    const m: number[][] = [];
    let counter = 1;
    for (let row = 0; row < 7; row++) {
      m[row] = [];
      for (let col = 0; col < 7; col++) {
        m[row][col] = -1;
        if (row === 0 && col + 1 >= firstDay) {
          m[row][col] = counter++;
        } else if (row > 0 && counter <= daysInMonth) {
          m[row][col] = counter++;
        }
      }
    }

    return m;
  }, [activeDate]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.dateTitle}>
          {months[activeDate.month()]} {activeDate.year()}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={decrementMonth}>
            <Image
              style={{height: 25, aspectRatio: 1}}
              source={require('../../assets/images/buttons/left-chevron.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={incrementMonth}>
            <Image
              style={{height: 25, aspectRatio: 1, marginLeft: 24}}
              source={require('../../assets/images/buttons/right-chevron.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calendar}>
        {getLocaleDays().map((item, index) => {
          return (
            <View style={{flex: 1}} key={index}>
              <Text style={styles.calendarDayTitle}>{item}</Text>
            </View>
          );
        })}
      </View>
      {matrix.map((row, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
            }}>
            {row.map((item, key) => (
              <CustomDayCell
                key={key}
                isDayOff={
                  item > -1
                    ? moment(activeDate).set('date', item).isAfter(moment())
                    : false
                }
                title={item !== -1 ? String(item) : ''}
                subtitle={
                  stepDays[item]
                    ? formatNumberWithSpaces(stepDays[item])
                    : undefined
                }
              />
            ))}
          </View>
        );
      })}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#999999" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  calendar: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  calendarDayTitle: {
    color: '#556073',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
