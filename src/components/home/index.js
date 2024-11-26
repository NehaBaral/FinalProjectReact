import React from 'react';
import { View, Text, Image, FlatList, ImageBackground,TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const userInfo = {
    name: 'Miley Doe',
    email: 'miley.doe@example.com',
    avatar: 'https://via.placeholder.com/100',
  };

  const pets = [
    { id: '1', name: 'Bella', type: 'Dog', image: 'https://via.placeholder.com/120', age: 8 },
    { id: '2', name: 'Mittens', type: 'Cat', image: 'https://via.placeholder.com/120', age: 6 },
    { id: '3', name: 'Goldie', type: 'Fish', image: 'https://via.placeholder.com/120', age: 2 },
  ];

  const handlePress = (item) => {
    navigation.navigate('PetDetail', { ele: item })
  };

  const renderPetCard = ({ item }) => (
    <TouchableOpacity style={styles.petCard}  onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petAge}>({item.age})</Text>
      </View>
      <Text style={styles.petType}>{item.type}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
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

