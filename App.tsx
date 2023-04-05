import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Calendar from './src/components/calendar/calendar';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Calendar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
});

export default App;
