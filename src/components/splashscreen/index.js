import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'; 
import styles from './styles';

export default function CustomSplashScreen() {
  const navigation = useNavigation(); 
  const route = useRoute();
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    if (SplashScreen && SplashScreen.hide) {
      SplashScreen.hide();
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
     navigation.replace('Login'); 
    }, 4000); 

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);


  return (
    <View style={styles.container}>
        <View  style={styles.lottieAnimation}>
      <LottieView
        source={require('../../../assets/animations/dog.json')} 
        loop={true} 
        autoPlay={true}
        style={styles.lottieAnimation}
      />
      </View >
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Text style={[styles.logoText,{ fontFamily: 
       
          'Roboto', fontStyle:'bold' }]}>Pets World</Text>
        <Text style={[styles.subTagline,{ fontFamily: 'Roboto', fontStyle: 'italic'}]}>Making Your Pet's Dreams Come True</Text>
      </Animated.View>
    </View>
  );
}

