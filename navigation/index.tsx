import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';
import Event from '../screens/Event';
import * as SplashScreen from 'expo-splash-screen';
import GetLocation from '../screens/GetLocation';
import { useUserContext } from '../provider/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/utils';
import { formatLocation } from '../services/utils';
import { useMapContext } from '../provider/MapProvider';
import { getAddressFromGeoCode } from '../services/googleGeocode';
import { Address } from '../services/types';
import MyEvents from '../screens/MyEvents';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  GetLocation: undefined;
  Home: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { setUser, user } = useUserContext();
  const { setLocation, setAddress } = useMapContext();

  const getAsyncStorageUserId = async () => {
    try {
      return await AsyncStorage.getItem('userId');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getUserWithId() {
      try {
        const userId = await getAsyncStorageUserId();

        if (!userId) {
          return;
        }

        const res = await axios.get(BASE_URL + '/user/' + userId);

        if (res.data) {
          const coordinates = res.data.geocode.coordinates;
          try {
            const address: Address = await getAddressFromGeoCode(
              formatLocation(coordinates),
            );

            setLocation(formatLocation(res.data.geocode.coordinates));
            setAddress(address);
          } catch (e) {
            // TODO : Erreur
          }

          setUser(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    getUserWithId();
  }, []);

  return (
    <RootStack.Navigator>
      {user ? (
        <RootStack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="GetLocation"
          component={GetLocation}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
}

export type SearchStackParamList = {
  Search: undefined;
  Event: undefined;
};
const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function SearchNav() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: false,
        }}
      />
    </SearchStack.Navigator>
  );
}

export type BottomTabStackParamList = {
  Discover: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
  MyEvents: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <BottomTab.Navigator
        initialRouteName="Discover"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
      >
        <BottomTab.Screen
          name="Discover"
          component={Discover}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Search"
          component={SearchNav}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="MyEvents"
          component={MyEvents}
          options={{
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </SafeAreaView>
  );
}

/**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
