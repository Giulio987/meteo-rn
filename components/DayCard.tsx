import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from '../UI/Card';
import { FontSizes, Fonts } from '../styles/Fonts';
interface DayCardProps {
  weather: any; //TODO fix any
}

const DayCard = ({ weather }: DayCardProps) => {
  return (
    <Card style={styles.meteoCard}>
      <Text style={styles.day}>{weather.localeDate.split(' ')[0]}</Text>
      <Text style={styles.temperature}>
        {weather.temperature.toFixed() + '°'}
      </Text>
      <View
        style={{
          alignItems: 'flex-start',
          height: 90,
        }}
      >
        <Image source={weather.image} style={{}} />
      </View>
    </Card>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  meteoCard: {
    marginHorizontal: 15,
    backgroundColor: '#ffffff1a',
    maxHeight: 260,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  day: {
    fontSize: FontSizes.info.day,
    fontFamily: Fonts.semiBold,
    color: 'white',
    lineHeight: 33,
  },
  temperature: {
    fontSize: FontSizes.info.temperatureSmall,
    fontFamily: Fonts.semiBold,
    color: 'white',
    lineHeight: 55,
  },
});
