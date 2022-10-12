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
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootBottomNavigationProp } from '../models/route';

export const INITIAL_CITIES = [
  {
    name: 'Turin',
    country: 'IT',
    id: 'c1',
    coord: { lat: 45.064, lon: 7.66 },
  },
  { name: 'London', country: 'GB', id: 'c2', coord: { lat: 51.5, lon: -0.1 } },
  {
    name: 'Rome',
    country: 'IT',
    id: 'c3',
    coord: {
      lat: 41.9,
      lon: 12.5,
    },
  },
];

const Home = () => {
  //TODO per componenti diretti meglio { navigation, route }: RootBottomTabsScreenProps ma c'è un errore nei tipi da fixare
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

  const navigation = useNavigation<RootBottomNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        data={cities}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Good morning!{'\n'}Giulio</Text>
            <AddCityBtn
              onPress={() => {
                navigation.navigate('HomeNav', {
                  screen: 'InputModal',
                });
              }}
            />
          </View>
        }
        renderItem={({ item }) => <CitiyCard city={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
      <LinearGradient
        style={{
          position: 'absolute',
          bottom: 30,
          width: '90%',
          height: 20,
          marginHorizontal: 20,
        }}
        colors={['rgba(255, 255, 255, 0.001)', 'rgba(255, 255, 255, 0.1)']}
        pointerEvents={'none'}
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
    marginBottom: 80,
    overflow: 'hidden',
  },
  list: {
    flex: 1,
  },
  listHeader: {
    alignItems: 'center',
  },
  listContentContainer: {
    marginHorizontal: 20,
    paddingTop: height > 800 ? 40 : 20,
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primary.main,
    fontSize: FontSizes.home.xxl,
    textAlign: 'center',
  },
});
