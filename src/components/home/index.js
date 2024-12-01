import React, {useEffect, useState,useContext} from 'react';
import { View, Text, Image, FlatList,SafeAreaView, Button, TextInput, ImageBackground,TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { auth } from '../../database/config';
import { StateContext } from '../../../StateContext';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';


export default function Home() {
  const navigation = useNavigation();
  const {pets: [pets], getPetsByUser,  addNewPet, deletePet} = useContext(StateContext)
  const { user } = useAuthentication();
  const [addPet, setAddPet] = useState(false);
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('dog')
  const [petAge, setPetAge] = useState('')
  const [petImage, setPetImage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
          getPetsByUser(auth.currentUser.uid);
      }
  }, [user]);

  const handleFABPress = () => {
    setAddPet(true)
  }

  const close = () => {
    setAddPet(false)
  }

  const submitPet = () => {
      if (petName && petType && petAge) {
          addNewPet({
              name: petName,
              type: petType,
              age: petAge,
              image: petImage
          })
          setPetName('')
          setPetType('dog')
          setPetAge('')
          setPetImage('');
          setErrorMessage(null)
          setAddPet(false)
      } else {
          setErrorMessage("All fields are mandatory.")
      }
  }

  const handlePetNameChange = (value) => {
    setPetName(value)
  }

  const handlePetTypeChange = (value) => {
    setPetType(value)
  }

  const handlePetAgeChange = (value) => {
    setPetAge(value)
  }
  

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

    if (addPet) {
      return (
          <View style={styles.petContainer}>
              <SafeAreaView />
              <Text style={styles.petHeader}>Add a new pet</Text>
              <View style={styles.addContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter pet name."
                    onChangeText={(value) => setPetName(value)}
                  />
                  <View style={styles.dropdownContainer}>
                    <Picker
                      selectedValue={petType}
                      onValueChange={(value) => setPetType(value)}
                      style={styles.dropdown}>
                      <Picker.Item label="Dog" value="dog" />
                      <Picker.Item label="Cat" value="cat" />
                      <Picker.Item label="Fish" value="fish" />
                    </Picker>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter pet age."
                    keyboardType="numeric"
                    onChangeText={(value) => setPetAge(value)}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter image URL (Optional)"
                    onChangeText={(value) => setPetImage(value)}
                  />
                  {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                  <View style={styles.buttonContainer}>
                      <View style={styles.button}>
                          <Button color='red' title="Close" onPress={close}></Button>
                      </View>
                      <View>
                          <Button title="Submit" onPress={submitPet}></Button>
                      </View>
                  </View>
              </View>

          </View>
      )
  } else {
    return(
    <ImageBackground
      source={require('../../../assets/Pets-home.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
      <Ionicons name="person-circle-outline" size={70} color="black" style={styles.avatar} />
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
      <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
          <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
   </ImageBackground>
  );
}
}

