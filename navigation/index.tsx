import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Discover from '../screens/Discover';
import Search from '../screens/Search';
import Favorites from '../screens/Favorites';
import Settings from '../screens/Settings';
import Event from '../screens/Event';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useMapContext } from '../provider/MapProvider';
import GetLocation from '../screens/GetLocation';

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

const StackSharedElement = createSharedElementStackNavigator();
const StackSearch = createNativeStackNavigator();

function RootNavigator() {
  const { location } = useMapContext();

  return (
    <StackSharedElement.Navigator>
      {/*<StackSharedElement.Screen*/}
      {/*  name="GetLocation"*/}
      {/*  component={GetLocation}*/}
      {/*  options={{ headerShown: false }}*/}
      {/*/>*/}
      <StackSharedElement.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </StackSharedElement.Navigator>
  );
}
function SearchNav() {
  return (
    <StackSearch.Navigator>
      <StackSearch.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <StackSearch.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: false,
        }}
      />
    </StackSearch.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
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
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
