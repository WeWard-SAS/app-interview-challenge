import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarHelper from '../../helpers/calendarHelper';
import Theme from '../../theme/theme';

const chevron = require('../../assets/img/chevron.png');

interface CalendarHeaderProps {
  month: moment.Moment;
  isLoading: boolean;
  selectPreviousMonth: () => void;
  selectNextMonth: () => void;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.currentMonth}>
        {props.month.format(CalendarHelper.MONTH_FORMAT)}
      </Text>

      <View style={styles.monthSelector}>
        <ActivityIndicator
          animating={true}
          style={{display: props.isLoading ? 'flex' : 'none'}}
        />

        <TouchableOpacity
          onPress={props.selectPreviousMonth}
          style={{
            marginRight: 20,
            opacity: props.isLoading ? 0.3 : 1.0,
            display: props.isLoading ? 'none' : 'flex',
            transform: [{rotate: '180deg'}],
          }}
          disabled={props.isLoading}>
          <Image source={chevron} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.selectNextMonth}
          disabled={props.isLoading}
          style={{
            opacity: props.isLoading ? 0.3 : 1.0,
            display: props.isLoading ? 'none' : 'flex',
          }}>
          <Image source={chevron} style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CalendarHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingLeft: 32,
    paddingRight: 20,
  },
  currentMonth: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    color: Theme.primaryColor,
    textTransform: 'capitalize',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
