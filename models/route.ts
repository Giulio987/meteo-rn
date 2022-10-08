import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CityWeather } from './weather';

// NOTE Route params -> da usare quando si crea il navigator
export type BottomTabsParamList = {
  HomeNav: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Location: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  CityInfo: { city: CityWeather };
};

//NOTE Note Route props -> da usare quando si passano navigation e route come props oppure con l'hook per route
export type HomeStackNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>;

export type RootBottomTabsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'HomeNav'>,
  HomeStackNavigationProps
>;

//NOTE per l'annotazione del navigation
export type RootBottomNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, 'HomeNav'>,
  NativeStackNavigationProp<HomeStackParamList>
>;
