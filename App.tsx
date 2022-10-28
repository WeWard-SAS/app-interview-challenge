import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {CustomCalendar} from './components/CustomCalendar/CustomCalendar';
import {getStepsHistory} from './services/healthService';
import moment from 'moment';
import {formatStepsData, StepsByDays} from './utils/stepUtils';

const App = () => {
  const [activeDate, setActiveDate] = useState(moment());
  const [stepDays, setStepDays] = useState<StepsByDays>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const startOfMonth = moment(activeDate)
      .startOf('month')
      .format('YYYY-MM-DD');
    const endOfMonth = moment(activeDate).add(1, 'month').format('YYYY-MM-DD');

    (async function () {
      setIsLoading(true);
      const steps = await getStepsHistory(startOfMonth, endOfMonth);
      setStepDays(formatStepsData(steps));
      setTimeout(() => {
        // Simulate debounce function
        setIsLoading(false);
      }, 1000);
    })();
  }, [activeDate]);

  const onDateChange = (date: moment.Moment) => {
    setStepDays({});
    setActiveDate(date);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}>
        <CustomCalendar
          isLoading={isLoading}
          activeDate={activeDate}
          onDateChange={onDateChange}
          stepDays={stepDays}
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
