import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Colors from './styles/Colors';
import CityInfo from './screens/CityInfo';
import { HomeStackParamList, BottomTabsParamList } from './models/route';
import CityInput from './components/CityInput';
import { PersistGate } from 'redux-persist/integration/react';

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="CityInfo"
          component={CityInfo}
          options={{
            headerShown: false,
          }}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
        <HomeStack.Screen
          component={CityInput}
          name="InputModal"
          options={{ headerShown: false }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    //import from google fonts
    'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  //TODO Quando si tiene premuto su una card si apre un modal con la possibilità di cancellare la città -> sempre metodo di storage e reduxù

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: styles.tabBar,
                headerShown: false,
                tabBarShowLabel: false,
              })}
            >
              <Tab.Screen
                name="HomeNav"
                component={HomeStackNavigator}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <View style={styles.tabScreenContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            source={require('./assets/home.png')}
                            style={{ alignSelf: 'center' }}
                          />
                        </View>
                        {focused && (
                          <View
                            style={{
                              borderBottomWidth: 2,
                              borderBottomColor: Colors.primary.main,
                              width: 71,
                            }}
                          />
                        )}
                      </View>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Search"
                component={Home}
                options={{
                  tabBarIcon: ({}) => {
                    return <Image source={require('./assets/search.png')} />;
                  },
                }}
                listeners={{
                  tabPress: (e) => {
                    // Prevent default action and disable tab press
                    e.preventDefault();
                  },
                }}
              />
              <Tab.Screen
                name="Location"
                component={Home}
                options={{
                  tabBarIcon: ({}) => {
                    return <Image source={require('./assets/location.png')} />;
                  },
                }}
                listeners={{
                  tabPress: (e) => {
                    // Prevent default action and disable tab press
                    e.preventDefault();
                  },
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 25,
    paddingBottom: 0,
  },
  tabScreenContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
});
