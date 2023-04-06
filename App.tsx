import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Calendar from './components/Calendar';
import moment from 'moment';
import {getStepsHistory} from './services/healthService';
import {getDailySteps} from './components/calendarHelper';
import {StepsData} from './types';

const currentStartDate = moment(new Date()).startOf('month');

const App = () => {
  const [startDate, setStartDate] = useState(currentStartDate.toDate());
  const [stepsData, setStepsData] = useState<StepsData>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endDate = moment(startDate).endOf('month');
    getStepsHistory(startDate.toISOString(), endDate.toISOString()).then(
      stepsHistory => {
        const dailySteps = getDailySteps(stepsHistory);
        setStepsData(dailySteps);
        setLoading(false);
      },
    );
  }, [startDate]);

  const onStartDateChanged = (newStartDate: Date) => {
    setStartDate(newStartDate);
    setLoading(true);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}>
        <Calendar
          startDate={startDate}
          stepsData={stepsData}
          loading={loading}
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
