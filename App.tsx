import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Calendar from './components/Calendar';
import moment from 'moment';
import {getStepsHistory} from './services/healthService';

const currentStartDate = moment(new Date()).startOf('month');

const App = () => {
  const [startDate, setStartDate] = useState(currentStartDate.toDate());

  useEffect(() => {
    const endDate = moment(startDate).endOf('month');
    getStepsHistory(startDate.toISOString(), endDate.toISOString()).then(
      stepsHistory => console.log(stepsHistory),
    );
  }, [startDate]);

  const onStartDateChanged = (newStartDate: Date) => {
    setStartDate(newStartDate);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}>
        <Calendar
          startDate={startDate}
          onStartDateChanged={onStartDateChanged}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});

export default App;
