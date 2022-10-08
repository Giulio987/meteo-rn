import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
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
  InputModal: undefined;
};

//NOTE Note Route props -> da usare quando si passano navigation e
export type HomeStackNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>;

export type RootBottomTabsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'HomeNav'>,
  HomeStackNavigationProps
>;

//NOTE per l'annotazione del navigation -> useNavigation
export type RootBottomNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, 'HomeNav'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

//NOTE Per l'annotazione del route utilizzato -> useRoute
export type HomeRouteProp = RouteProp<HomeStackParamList, 'CityInfo'>;
