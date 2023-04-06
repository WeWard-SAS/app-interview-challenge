import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {EMPTY_STRING} from '../Constants';
import {StepsData} from '../types';
import Labels from '../Labels';
import {getMatrix} from './calendarHelper';

type CalendarProps = {
  startDate: Date;
  stepsData: StepsData;
  loading: boolean;
  onStartDateChanged: (newStartDate: Date) => void;
};

const Calendar = (props: CalendarProps) => {
  const {startDate, stepsData, loading, onStartDateChanged} = props;
  if (loading) {
    return (
      <View>
        <Text>{Labels.Loading}</Text>
      </View>
    );
  }

  const Header = () => {
    let title = EMPTY_STRING;
    if (startDate) {
      const monthName = moment(startDate).format('MMMM');
      const year = moment(startDate).year();
      title = `${monthName} ${year}`;
    }

    const handleMonthChange = (value: number) => {
      const newStartDate = moment(startDate).add(value, 'month');
      onStartDateChanged(newStartDate.toDate());
    };

    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => {
              handleMonthChange(-1);
            }}>
            <Image
              source={require('../assets/previous.png')}
              style={styles.navigationImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => {
              handleMonthChange(+1);
            }}>
            <Image
              source={require('../assets/next.png')}
              style={styles.navigationImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const CalendarBody = () => {
    const calendarMatrix = getMatrix(startDate);
    const calendarRows = calendarMatrix.map((row, rowIndex: number) => {
      let rowItems = row.map((item: number | string, colIndex: number) => {
        const day = item as number;
        const steps = day !== -1 ? stepsData.get(day)?.toString() : '';
        return (
          <View key={colIndex} style={styles.dayContainer}>
            <Text style={styles.dayText}>{item !== -1 ? item : ''}</Text>
            <Text style={styles.stepsText}>{steps}</Text>
          </View>
        );
      });

      return (
        <View key={rowIndex} style={styles.rowContainer}>
          {rowItems}
        </View>
      );
    });
    return <View style={styles.calendarContainer}>{calendarRows}</View>;
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <CalendarBody />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    paddingRight: 10,
    paddingLeft: 10,
  },
  calendarContainer: {},
  headerTextContainer: {
    width: '75%',
  },
  headerTitle: {
    fontSize: 20,
    color: 'black',
  },
  navigationContainer: {
    width: '25%',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  navigationButton: {
    borderWidth: 0,
    marginRight: 10,
    marginLeft: 10,
  },
  navigationImage: {
    width: 25,
    height: 25,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
  },
  dayText: {
    color: 'black',
    marginBottom: 2,
    fontSize: 12,
  },
  stepsText: {
    color: 'orange',
    marginBottom: 10,
    fontSize: 12,
  },
});
export default Calendar;
