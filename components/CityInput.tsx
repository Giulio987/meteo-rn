import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { getCityLocation, getWeather } from '../redux/thunks/weather';
import { CityToDispatch } from '../models/weather';
import { INITIAL_CITIES } from '../screens/Home';
import { RootBottomNavigationProp } from '../models/route';
import { useNavigation } from '@react-navigation/native';

interface CityInputProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const CityInput = () => {
  //navigation
  const navigation = useNavigation<RootBottomNavigationProp>();
  //Redux
  const dispatch = useAppDispatch();
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
            id: 'c' + (INITIAL_CITIES.length + 1).toString(),
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
    <View style={{ flex: 1, padding: 100 }}>
      <Text>Inserisci la città</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCityNameChange}
        value={cityName}
      />
      <Button onPress={handleSubmit} title={'Add city'} />
    </View>
  );
};

export default CityInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
