import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButtonView: {
    flexDirection: 'row',
  },
  headerText: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  blank: {
    width: 24,
  },
  calendarItemDay: {
    height: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  calendarItemStep: {
    height: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: 'orange',
  },
  calendarItemOther: {
    flex: 1,
    height: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
  },
  calendarItemNoStep: {
    flex: 1,
    height: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: 'gray',
  },
  calendarPointView: {
    flex: 1,
    flexDirection: 'column',
  },
  calendarRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 40,
  },
});
