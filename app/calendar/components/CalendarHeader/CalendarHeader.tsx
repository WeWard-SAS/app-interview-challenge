import React, {FC} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CalendarHeaderProps} from './CalendarHeader.d';
import {styles} from '../../styles';
import {months} from '../../utils/constants';

const CalendarHeader: FC<CalendarHeaderProps> = ({activeDate, changeMonth}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {months[activeDate.getMonth()]} &nbsp;
        {activeDate.getFullYear()}
      </Text>
      <View style={styles.headerButtonView}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Image
            style={styles.headerIcon}
            source={require('../../../assets/arrow-left.png')}
          />
        </TouchableOpacity>
        <View style={styles.blank} />
        <TouchableOpacity onPress={() => changeMonth(+1)}>
          <Image
            style={styles.headerIcon}
            source={require('../../../assets/arrow-right.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalendarHeader;
