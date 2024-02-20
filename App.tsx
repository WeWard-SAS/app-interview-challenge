import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {getStepsHistory} from './services/healthService';
import {Calendar} from './src/components/calendar';

const App = () => {
  useEffect(() => {
    (async function () {
      const steps = await getStepsHistory('2022-09-01', '2022-10-01');

      console.log(steps);
    })();
  });

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContainer}>
        <Calendar />
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
