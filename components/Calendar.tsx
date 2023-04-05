import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {EMPTY_STRING} from '../Constants';

type CalendarProps = {
  startDate: Date;
  onStartDateChanged: (newStartDate: Date) => void;
};

const Calendar = (props: CalendarProps) => {
  const {startDate, onStartDateChanged} = props;

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
    return (
      <View style={styles.calendarContainer}>
        <Text>Calendar Body</Text>
      </View>
    );
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
  },
  calendarContainer: {
    backgroundColor: 'cyan',
  },
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
});
export default Calendar;
