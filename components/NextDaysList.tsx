import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import DayCard from './DayCard';
import { DailyWeather } from '../models/weather';

const NextDaysList = ({ dailyWeather }: { dailyWeather: DailyWeather[] }) => {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={dailyWeather}
      renderItem={({ item }) => <DayCard weather={item} />}
      keyExtractor={(item) => item.localeDate + item.temperature}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};
//TODO adaptive per schermi piccoli

export default NextDaysList;
const styles = StyleSheet.create({
  list: {
    marginBottom: 100,
    marginTop: 40,
  },
});
