import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type CalendarHeaderProps = {
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
};
export const CalendarHeader = ({
  month,
  year,
  setMonth,
  setYear,
}: CalendarHeaderProps) => {
  const strMonth = monthNames[month - 1];

  const onNavToNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const onNavToPreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{margin: 5, fontSize: 16}}>
          {strMonth} {year}
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{margin: 5}} onPress={onNavToPreviousMonth}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 5}} onPress={onNavToNextMonth}>
            <Text>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {weekDays.map(weekDay => (
          <Text style={{textAlign: 'center', flex: 1}}>{weekDay}</Text>
        ))}
      </View>
    </View>
  );
};

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
