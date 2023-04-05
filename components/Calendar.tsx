import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getStepsHistory} from '../services/healthService';
import moment from 'moment';

const currentStartDate = moment(new Date()).startOf('month');

const Calendar = () => {
  const [startDate, setStartDate] = useState(currentStartDate.toDate());

  useEffect(() => {
    const endDate = moment(startDate).endOf('month');
    getStepsHistory(startDate.toISOString(), endDate.toISOString()).then(
      stepsHistory => console.log(stepsHistory),
    );
  }, [startDate]);

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text>Calendar Header</Text>
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
    <View style={styles.container}>
      <Header />
      <CalendarBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'yellow',
  },
  calendarContainer: {
    backgroundColor: 'cyan',
  },
});
export default Calendar;
