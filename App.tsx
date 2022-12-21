import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar} from './src/Calendar';

const App = () => {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2022);

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
