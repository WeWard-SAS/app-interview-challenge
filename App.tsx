import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {getStepsHistory} from './services/healthService';
import {Calendar} from './src/Calendar';

const App = () => {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2022);

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
        <View>
          <Calendar
            month={month}
            year={year}
            setYear={setYear}
            setMonth={setMonth}
          />
        </View>
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
