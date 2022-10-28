import React, {FunctionComponent, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CustomDayCellProps {
  title: string;
  subtitle?: string;
  isDayOff?: boolean;
}
export const CustomDayCell: FunctionComponent<CustomDayCellProps> = ({
  title,
  subtitle,
  isDayOff = false,
}) => {
  const isCellEmpty = useMemo(() => {
    return title === '';
  }, [title]);

  return (
    <View style={styles.container}>
      {!isCellEmpty && (
        <>
          <Text
            style={{
              color: !subtitle || isDayOff ? '#999999' : '#2D3444',
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
          {subtitle && !isDayOff && subtitle.length > 0 && (
            <Text style={{color: '#EE844B'}}>{subtitle}</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
