import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

interface ICalendarHeaderProps {
  month: string;
  onPressLeft: () => void;
  onPressRight: () => void;
}

export const CalendarHeader = ({
  month,
  onPressLeft,
  onPressRight,
}: ICalendarHeaderProps) => {
  return (
    <>
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{month}</Text>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={onPressLeft}>
            <Image
              source={require('../../assets/left-arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRight}>
            <Image
              source={require('../../assets/right-arrow.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separationLine} />
    </>
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontWeight: '600',
    fontSize: 16,
  },
  arrowContainer: {
    flexDirection: 'row',
  },
  arrow: {
    width: 30,
    height: 30,
  },
  separationLine: {
    backgroundColor: '#BEC7D2',
    height: 1,
  },
});
