import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'rgba(0, 56, 142, 0.5)', 
    },
    scrollContainer: {
      paddingBottom: 16,
      opacity:1
    },
    animalCard: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 4 },
    },
    image: {
      width: '80%',
      height: 100,
      borderRadius: 10,
      alignSelf:'center'
      
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 8,
      color: '#fffff', 
    },
    details: {
      fontSize: 16,
      marginVertical: 4,
      color: '#fffff', 
    },
    errorText: {
      color: 'red',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    loadingText: {
      color: '#00388e',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
  });

  export default styles;