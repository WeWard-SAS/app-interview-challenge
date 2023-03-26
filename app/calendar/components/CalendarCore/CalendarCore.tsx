import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {CalendarCoreProps} from './CalendarCore.d';
import {styles} from '../../styles';
import {
  CalendarDataPoint,
  StringOrNumberOrCalendarDataPoint,
} from '../../utils/types';

const CalendarCore: FC<CalendarCoreProps> = ({matrix}) => {
  let rows = [];
  rows = matrix.map(
    (row: StringOrNumberOrCalendarDataPoint[], rowIndex: number) => {
      let rowItems = row.map(
        (item: StringOrNumberOrCalendarDataPoint, colIndex: number) => {
          if (typeof item === 'string') {
            return (
              <Text key={colIndex} style={styles.calendarItemOther}>
                {item}
              </Text>
            );
          } else if (item !== -1 && (item as CalendarDataPoint).steps === 0) {
            return (
              <Text style={styles.calendarItemNoStep}>
                {(item as CalendarDataPoint).day}
              </Text>
            );
          } else if (item !== -1) {
            return (
              <View style={styles.calendarPointView} key={colIndex}>
                <Text style={styles.calendarItemDay}>
                  {(item as CalendarDataPoint).day}
                </Text>
                <Text style={styles.calendarItemStep}>
                  {(item as CalendarDataPoint).steps}
                </Text>
              </View>
            );
          } else {
            return <Text key={colIndex} style={styles.calendarItemOther} />;
          }
        },
      );
      return (
        <View style={styles.calendarRow} key={rowIndex}>
          {rowItems}
        </View>
      );
    },
  );

  return <View>{rows}</View>;
};

export default CalendarCore;
