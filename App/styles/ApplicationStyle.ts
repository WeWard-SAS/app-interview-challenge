import colors from './colors';
import { Platform, StyleSheet } from 'react-native';

const isAndroid = Platform.OS === 'android';

const ApplicationStyles = StyleSheet.create({
  /** Container **/
  flex: { flex: 1 },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  /** Text Styles **/
  genericText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  textError: { color: colors.orange, fontSize: 12 },
  textWeekDay: {
    color: colors.gray,
    fontSize: 12,
  },
  textStepHistory: {
    color: colors.orange,
    marginTop: 3,
  },
  monthText: {
    fontSize: 17,
    color: colors.black,
  },

  /** Icons **/
  smallIcon: {
    width: 20,
    height: 20,
  },

  /* Divider */
  divider: {
    height: 2,
    opacity: 0.1,
    marginTop: 24,
    backgroundColor: colors.grayLight,
  },
});

export default ApplicationStyles;
