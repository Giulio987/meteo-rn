import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { RootState, useAppDispatch } from '../redux/store';
import { getCityLocation, getWeather } from '../redux/thunks/weather';
import { CityToDispatch } from '../models/weather';
import { RootBottomNavigationProp } from '../models/route';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Fonts, FontSizes } from '../styles/Fonts';
import Colors from '../styles/Colors';

interface CityInputProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const CityInput = () => {
  //navigation
  const navigation = useNavigation<RootBottomNavigationProp>();
  //Redux
  const dispatch = useAppDispatch();
  const { cities } = useSelector((state: RootState) => state.weather);
  //City status
  const [cityName, setCityName] = useState('');
  const handleCityNameChange = (text: string) => {
    setCityName(text);
  };
  const handleSubmit = () => {
    if (cityName.length > 0) {
      dispatch(getCityLocation(cityName))
        .then((data) => {
          const { lat, lon, country } = data[0];
          const city: CityToDispatch = {
            name: cityName,
            coord: { lat, lon },
            country,
            id: cityName + 'c' + (cities.length + 1).toString(),
          };
          dispatch(getWeather(city))
            .then(() => {
              setCityName('');
              navigation.goBack();
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log('Errore: ' + e));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a new city</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCityNameChange}
        value={cityName}
        placeholder="City name"
        autoComplete="off"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && Platform.OS === 'ios' ? styles.pressed : null,
          ]}
          android_ripple={{ color: Colors.rainy.light }}
          onPress={handleSubmit}
        >
          <View style={styles.innerBtnContainer}>
            <Text style={styles.buttonText}>ADD CITY</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CityInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
  label: {
    fontSize: FontSizes.home.xl,
    fontFamily: Fonts.bold,
    color: Colors.primary.main,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 12,
    marginTop: 12,
  },
  buttonContainer: {
    elevation: 4,
    shadowColor: '#595959',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 16,
  },
  button: {},
  innerBtnContainer: {
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: Colors.primary.main,
    padding: 12,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: FontSizes.home.m,
    color: 'white',
    fontWeight: 'bold',
  },
});
