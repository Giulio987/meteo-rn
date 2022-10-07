import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState, useAppDispatch } from '../redux/store';
import { getWeather } from '../redux/thunks/weather';
import AddCityBtn from '../components/AddCityBtn';
import Colors from '../styles/Colors';
import { useSelector } from 'react-redux';
import CitiyCard from '../components/CitiyCard';
import { FontSizes } from '../styles/Fonts';

const INITIAL_CITIES = [
  {
    name: 'Turin',
    country: 'IT',
    id: 1,
    coord: { lat: 45.064, lon: 7.66 },
  },
  { name: 'London', country: 'GB', id: 2, coord: { lat: 51.5, lon: -0.1 } },
  {
    name: 'Rome',
    country: 'IT',
    id: 3,
    coord: {
      lat: 41.9,
      lon: 12.5,
    },
  },
];

const Home = () => {
  //TODO background color
  //TODO fix orario -> londra un ora indietro
  //TODO mettera anche i meteo che mancano e prenderli dalla descrizione avanzata: es partly-cloudy-day e occ-light-rain
  //Redux
  //TODO mettere tutti i path di imamagini in costanti
  const { cities } = useSelector((state: RootState) => state.weather);
  const dispatch = useAppDispatch();
  const dispatchMyAPi = useCallback(async () => {
    for (const city of INITIAL_CITIES) {
      await dispatch(getWeather(city));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatchMyAPi()
      .then(() => console.log('done'))
      .catch((e) => console.log('Errore: ' + e));
  }, []);

  //Refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatchMyAPi().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={cities}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Good morning!{'\n'}Giulio</Text>
            <AddCityBtn />
          </View>
        }
        renderItem={({ item }) => <CitiyCard city={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    marginTop: height > 800 ? 40 : 20,
  },
  list: {
    paddingTop: 50,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContentContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.main,
    fontSize: FontSizes.home.xxl,
    textAlign: 'center',
  },
});
