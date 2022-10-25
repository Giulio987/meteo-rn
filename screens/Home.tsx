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
import { getCityLocation, getWeather } from '../redux/thunks/weather';
import AddCityBtn from '../components/AddCityBtn';
import Colors from '../styles/Colors';
import { useSelector } from 'react-redux';
import CitiyCard from '../components/CitiyCard';
import { FontSizes } from '../styles/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootBottomNavigationProp } from '../models/route';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { CityToDispatch } from '../models/weather';

const Home = () => {
  //TODO per componenti diretti meglio { navigation, route }: RootBottomTabsScreenProps ma c'è un errore nei tipi da fixare
  //Redux
  //TODO mettere tutti i path di imamagini in costanti
  const { cities } = useSelector((state: RootState) => state.weather);
  const dispatch = useAppDispatch();
  const dispatchMyAPi = useCallback(async () => {
    for (const city of cities) {
      dispatch(getCityLocation(city.name)).then((data: any) => {
        const { lat, lon, country } = data[0];
        const cityObj: CityToDispatch = {
          name: city.name,
          coord: { lat, lon },
          country,
          id: 'c' + (cities.length + 1).toString(),
        };
        dispatch(getWeather(cityObj));
      });
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

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: tabBarHeight }]}>
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
