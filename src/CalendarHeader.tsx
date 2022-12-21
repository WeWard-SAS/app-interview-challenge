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

  return (
    <View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
        }}>
        <Text style={{margin: 5, fontSize: 16}}>
          {strMonth} {year}
        </Text>
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
