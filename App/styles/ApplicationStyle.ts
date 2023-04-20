import { StyleSheet } from 'react-native';
import colors from './colors';

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
  fixedSizeDays: {
    marginTop: 5,
    height: 30,
  },

  /** Text Styles **/
  genericText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  textError: { color: colors.orange, fontSize: 12 },
  textWeekDay: {
    color: colors.grayDarker,
    fontSize: 12,
  },
  textAfterWeekDay: {
    color: colors.grayLight,
    fontSize: 12,
  },
  textStepHistory: {
    color: colors.orange,
    fontSize: 12,
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
