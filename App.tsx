import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Calendar from './App/Components/Calendar';
import moment from 'moment';

const App = () => {
  moment.locale('fr');
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
