import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CityWeather } from '../models/weather';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, FontSizes } from '../styles/Fonts';
import { getFormattedDate } from '../modules/utilities';
import { useNavigation } from '@react-navigation/native';
import { RootBottomNavigationProp } from '../models/route';
import { useAppDispatch } from '../redux/store';
import { removeCity } from '../redux/reducers/weather';

interface CitiyCardProps {
  city: CityWeather;
}

const CitiyCard = ({ city }: CitiyCardProps) => {
  const day = getFormattedDate(city.mainWeather.localeDate)[0];
  const month = getFormattedDate(city.mainWeather.localeDate)[1];
  const navigation = useNavigation<RootBottomNavigationProp>();

  //Redux
  const dispatch = useAppDispatch();
  const handleRemoveCity = () => {
    dispatch(removeCity(city.id));
  };
  return (
    <View style={styles.outerCard}>
      <Pressable
        onPress={() => {
          navigation.navigate('HomeNav', {
            screen: 'CityInfo',
            params: { city },
          });
        }}
        onLongPress={() => {
          Alert.alert(
            'Remove city',
            'Are you sure you want to remove this city?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Remove',
                style: 'destructive',
                onPress: handleRemoveCity,
              },
            ]
          );
        }}
      >
        <LinearGradient
          colors={[city.mainWeather.style.first, city.mainWeather.style.second]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.innerCard}
        >
          <View>
            <Text style={styles.title}>{city.name}</Text>
            <Text style={styles.date}>
              {day}
              {'\n'}
              {month}
            </Text>
            <Text style={styles.time}>{city.mainWeather.localTime}</Text>
          </View>
          {/*@ts-ignore TODO?*/}
          <Image source={city.mainWeather.image} />
          <Text style={styles.temperature}>
            {city.mainWeather.temperature.toFixed() + '°'}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default CitiyCard;

const styles = StyleSheet.create({
  outerCard: {
    //Android
    elevation: 5,
    //IOS
    shadowColor: '#0000002b',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 8,
    marginTop: 20,
    flex: 1,
  },
  innerCard: {
    flex: 1,
    padding: 20,
    paddingRight: 25,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperature: {
    fontSize: 50,
    fontFamily: Fonts.bold,
    lineHeight: 76,
    color: 'white',
  },
  title: {
    fontSize: FontSizes.home.xl,
    color: 'white',
    fontFamily: Fonts.semiBold,
    lineHeight: 39,
  },
  date: {
    fontSize: FontSizes.home.m,
    color: 'white',
    lineHeight: 18,
    fontFamily: Fonts.medium,
  },
  time: {
    fontSize: FontSizes.home.s,
    color: 'white',
    lineHeight: 18,
    fontFamily: Fonts.light,
    paddingTop: 12,
  },
});
