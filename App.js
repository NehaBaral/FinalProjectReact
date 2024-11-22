import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/components/login';
import Home from './src/components/home';
import Signup from './src/components/signup';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

  const MainTabNavigator = () => (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#145a32',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
    })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={Home}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
        name='Login'
        component={ Login }
        options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
