import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackBtn from '../components/BackBtn';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import TemperatureRow from '../components/TemperatureRow';
import { Fonts, FontSizes } from '../styles/Fonts';
import NextDaysList from '../components/NextDaysList';

const CityInfo = () => {
  const route = useRoute<any>(); //TODO: fix any
  return (
    <LinearGradient
      style={styles.container}
      colors={[
        route.params.city.mainWeather.style.first,
        route.params.city.mainWeather.style.second,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackBtn />
          <Text style={styles.cityName}>{route.params.city.name}</Text>
          <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
            <Image source={require('../assets/plus-white.png')}></Image>
          </Pressable>
        </View>
        <Text style={styles.date}>
          {route.params.city.mainWeather.localeDate}
        </Text>
        <Text style={styles.meteo}>{route.params.city.mainWeather.main}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={require('../assets/Cloudy.png')} />
          <Text style={styles.temperature}>
            {route.params.city.hourlyTemperatures[0].temperature.toFixed() +
              '°'}
          </Text>
        </View>
        {/*@ts-ignore TODO*/}
        <TemperatureRow
          hourlyTemperatures={route.params.city.hourlyTemperatures}
        />
        <NextDaysList dailyWeather={route.params.city.dailyWeather} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CityInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  pressed: { opacity: 0.5 },
  cityName: {
    fontSize: FontSizes.info.title,
    color: 'white',
    fontFamily: Fonts.semiBold,
    lineHeight: 48,
  },
  date: {
    fontSize: FontSizes.info.medium,
    color: 'white',
    fontFamily: Fonts.medium,
    textAlign: 'center',
    marginBottom: 20,
  },
  meteo: {
    fontSize: FontSizes.info.medium,
    color: 'white',
    fontFamily: Fonts.light,
    lineHeight: 30,
    textAlign: 'center',
  },
  temperature: {
    fontSize: FontSizes.info.temperature,
    color: 'white',
    fontFamily: Fonts.bold,
    lineHeight: 166,
    marginLeft: 40,
  },
});
