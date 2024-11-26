import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../components/home";
import { Ionicons } from '@expo/vector-icons';
import PetListing from "../components/petListing";
import PetDetail from "../components/petDetail";
import { StateProvider } from "../../StateContext";
import PetForm from "../components/petForm";

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

const HomeTab = () => {
  return (
    <Stack.Navigator>
      
      
      <Stack.Screen
        name='Home'
        component={Home}  options={{ headerShown: false }}>
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
            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SecondScreen') {
              iconName = focused ? 'list' : 'list-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
          <Tab.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false, title: 'Home' }}
          />
          <Tab.Screen
            name="SecondScreen"
            component={Pet}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}