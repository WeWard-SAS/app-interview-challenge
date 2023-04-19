import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import moment, { Moment } from 'moment';

import useStepsHistory from '../Utils/hooks/useStepsHistory';
import ApplicationStyles from '../styles/ApplicationStyle';
import Metrics from '../styles/Metrics';

import CalendarControls from './CalendarControls';
import CalendarWeekDays from './CalendarWeekDays';

const Calendar = () => {
  const [currentDate, setDate] = useState<string>(
    moment().startOf('month').format('YYYY MM'),
  );

  const { data, loading, error } = useStepsHistory(currentDate);

  if (error.length > 0) {
    return (
      <View style={[ApplicationStyles.flex, ApplicationStyles.columnContainer]}>
        <Text
          style={[ApplicationStyles.genericText, ApplicationStyles.textError]}>
          {error}
        </Text>
      </View>
    );
  } else if (data) {
    return (
      <View style={ApplicationStyles.flex}>
        <CalendarControls
          month={data.months}
          updateDate={(date: Moment) => setDate(date.format('YYYY MM'))}
          isLoading={loading}
        />
        <View style={ApplicationStyles.divider} />
        {loading ? (
          <ActivityIndicator
            size="small"
            style={{ marginTop: Metrics.doublePadding }}
          />
        ) : (
          <CalendarWeekDays weeks={data.weeks} />
        )}
      </View>
    );
  }
  return <></>;
};

export default Calendar;
