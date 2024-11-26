import { View, Text, Animated, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 667) * size;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffb02b',
      width: '100%',
      height: '100%', 
    },
    lottieAnimation: {
      width: width / 2, 
   height: height/2,
    },
    logoContainer: {
     // alignItems: 'center',
      marginTop: verticalScale(30),
      marginBottom:0,
    },
    logoText: {
      fontSize: scale(40),
      fontWeight: 'bold',
      color: '#ffffff', 
    },
    subTagline: {
      color: '#ffffff',
     
    },
  });
  
  export default styles;