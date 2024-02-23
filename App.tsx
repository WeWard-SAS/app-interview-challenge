import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Calendar} from './src/components/calendar';

const App = () => {
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
