import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import {getStepsHistory} from '../../../services/healthService';
import CalendarCore from '../components/CalendarCore/CalendarCore';
import CalendarHeader from '../components/CalendarHeader/CalendarHeader';
import {styles} from '../styles';
import {formatSteps, generateMatrix} from '../utils/functions';
import {MatrixType} from '../utils/types';

const CalendarScreen = () => {
  const [loading, setLoading] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const [matrix, setMatrix] = useState<MatrixType>([]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      let firstDay = new Date(
        activeDate.getFullYear(),
        activeDate.getMonth(),
      ).toISOString();
      let lastDay = new Date(
        activeDate.getFullYear(),
        activeDate.getMonth() + 1,
      ).toISOString();

      const steps = await getStepsHistory(firstDay, lastDay);

      const formattedSteps = formatSteps(steps);

      setMatrix(generateMatrix(activeDate, formattedSteps));
      setLoading(false);
    })();
  }, [activeDate]);

  const changeMonth = (plusOrMinusOne: number) => {
    const tempDate = new Date(activeDate);
    tempDate.setMonth(activeDate.getMonth() + plusOrMinusOne);
    setActiveDate(tempDate);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <CalendarHeader changeMonth={changeMonth} activeDate={activeDate} />
      <CalendarCore matrix={matrix} />
    </SafeAreaView>
  );
};

export default CalendarScreen;
