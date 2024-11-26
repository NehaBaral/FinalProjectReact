import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../components/home";
import { Ionicons } from '@expo/vector-icons';
import PetListing from "../components/petListing";
import PetDetail from "../components/petDetail";
import { StateProvider } from "../../StateContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Pet = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name='PetList'
        component={PetListing}>
      </Stack.Screen>

      <Stack.Screen
        name='PetDetail'
        component={PetDetail}>
      </Stack.Screen>


    </Stack.Navigator>
  )
};

export default function HomeStack() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#145a32',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SecondScreen') {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
          <Tab.Screen
            name="Home"
            component={Pet}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="SecondScreen"
            component={Home}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}