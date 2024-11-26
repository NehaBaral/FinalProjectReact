import React, {useEffect, useContext} from 'react';
import { View, Text, Image, FlatList, ImageBackground,TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { auth } from '../../database/config';
import { StateContext } from '../../../StateContext';

export default function Home() {
  const navigation = useNavigation();
  const {pets: [pets], getPetsByUser} = useContext(StateContext)
  const { user } = useAuthentication();
  
  useEffect(() => {
    if (user) {
          getPetsByUser(auth.currentUser.uid);
      }
  }, [user]);




  const handlePress = (item) => {
    navigation.navigate('PetDetail', { ele: item })
  };


  const renderPetCard = ({ item }) => {
    const defaultImage = checkType(item.type)

    const imageUri = item.image ? { uri: item.image } : defaultImage;
    return (
      <TouchableOpacity style={styles.petCard}  onPress={() => handlePress(item)}>
        <Image source={imageUri} style={styles.petImage} />
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petAge}>({item.age})</Text>
        </View>
        <Text style={styles.petType}>{item.type}</Text>
      </TouchableOpacity>
    );
  };

  function checkType(type) {
    const lowerCaseType = type.toLowerCase();
    if (lowerCaseType == 'dog' ) {
      return require('../../../assets/dog.jpg')
    } else if (lowerCaseType == 'cat') {
      return require('../../../assets/cat.jpg')
    } else {
      return require('../../../assets/fish.jpg')
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/Pets-home.jpg')} // Replace with your background image URL
      style={styles.background}
      resizeMode="cover"
    >
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../../assets/person.jpeg')} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user? auth.currentUser.email.split('@')[0]: ''}</Text>
          <Text style={styles.email}>{user? auth.currentUser.email : ''}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Your Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderPetCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.petList}
      />
    </ScrollView>
   </ImageBackground>
  );
}

