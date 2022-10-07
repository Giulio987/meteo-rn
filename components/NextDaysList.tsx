import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import DayCard from './DayCard';

const NextDaysList = ({ dailyWeather }: any) => {
  //TODO fix any
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
//TODO mettere la lista a 20 px dal bordo in basso e adattare la shermata al device
export default NextDaysList;

const styles = StyleSheet.create({
  list: {
    marginBottom: 100,
    marginTop: 40,
  },
});
