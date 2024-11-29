import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import styles from './styles'
const AdoptPetScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch('https://api.rescuegroups.org/v5/public/animals/search/available/?limit=10', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': 'b7HIVHtc', 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch animal data');
        }

        const data = await response.json();
        setAnimals(data.data); // Update state with an array of animals
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAnimalData();
  }, []);

  const handleAdopt = (animal) => {
    alert(`To adopt ${animal.attributes.name} Visit https://www.evah.ca/ or 1777 Dundas St, London, CA `);
  };

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!animals.length) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ImageBackground source={require('../../../assets/bg.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {animals.map((animal) => (
          <View key={animal.id} style={styles.animalCard}>
            <Image source={{ uri: animal.attributes.pictureThumbnailUrl }} style={styles.image} />
            <Text style={styles.name}>{animal.attributes.name}</Text>
            <Text style={styles.details}>Breed: {animal.attributes.breedPrimary}</Text>
            <Text style={styles.details}>Age: {animal.attributes.ageString}</Text>
            <Text style={styles.details}>{animal.attributes.descriptionText.length > 200
                ? `${animal.attributes.descriptionText.slice(0, 150)}...`
                : animal.attributes.descriptionText}</Text>
            <Button title="Adopt Me" onPress={() => handleAdopt(animal)} color="#00388e" />
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};



export default AdoptPetScreen;
