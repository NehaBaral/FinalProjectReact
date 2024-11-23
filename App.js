import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthentication } from './src/hooks/useAuthentication';
import HomeStack from './src/navigation/homeStack';
import AuthStack from './src/navigation/authStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  
  return user ? <HomeStack /> : <AuthStack />

}