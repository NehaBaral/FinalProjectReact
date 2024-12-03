import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, Button, TextInput, ImageBackground, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { auth } from '../../database/config';
import { StateContext } from '../../../StateContext';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Timestamp } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { signOut } from "firebase/auth";

export default function Home() {
  const navigation = useNavigation();
  const { pets: [pets], getPetsByUser, addNewPet, deletePet } = useContext(StateContext)
  const { user } = useAuthentication();
  const [addPet, setAddPet] = useState(false);
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('dog')
  const [petDOB, setPetDOB] = useState(Date())
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handlePickerOpen = () => setPickerVisible(true);
  const handlePickerClose = () => setPickerVisible(false);

  useEffect(() => {
    if (user) {
      getPetsByUser(auth.currentUser.uid);
    }
  }, [user]);

  const handleFABPress = () => {
    setPetDOB(new Date())
    setAddPet(true)
  }

  const close = () => {
    setAddPet(false)
  }

  const submitPet = () => {
    if (petName && petType && petDOB) {
      addNewPet({
        name: petName,
        type: petType,
        dob: Timestamp.fromDate(petDOB),
      })
      setPetName('')
      setPetType('dog')
      setPetDOB(Date())
      setErrorMessage(null)
      setAddPet(false)
    } else {
      setErrorMessage("All fields are mandatory.")
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setPetDOB(currentDate);
    hideDatePicker();
  }

  const handlePress = (item) => {
    navigation.navigate('PetDetail', { ele: item })
  };

  const getDOB = (value) => {

    const milliseconds = value?.seconds * 1000 + value?.nanoseconds / 1000000;

    const date = new Date(milliseconds);

    const formattedDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return <Text style={styles.petDOB}>({formattedDate})</Text>
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('sign out', 'success')
    }).catch((error) => {
      Alert.alert('Error', 'Sign out failed, try again after some time')
    });
  }

  const showDatePicker = () => {

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };



  const renderPetCard = ({ item }) => {
    const defaultImage = checkType(item.type)
    return (
      <TouchableOpacity style={styles.petCard} onPress={() => handlePress(item)}>
        <Image source={defaultImage} style={styles.petImage} />
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petInfo}>{getDOB(item.dob)}</Text>
        <Text style={styles.petType}>{item.type}</Text>
      </TouchableOpacity>
    );
  };

  function checkType(type) {
    const lowerCaseType = type.toLowerCase();
    if (lowerCaseType == 'dog') {
      return require('../../../assets/dog.jpg')
    } else if (lowerCaseType == 'cat') {
      return require('../../../assets/cat.jpg')
    } else {
      return require('../../../assets/fish.jpg')
    }
  }

  if (addPet) {
    return (
      <ImageBackground
        source={require('../../../assets/Pets-add.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.petContainer}>
          <SafeAreaView />
          <Text style={styles.petHeader}>Add a new pet</Text>
          <View style={styles.addContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter pet name."
              onChangeText={(value) => setPetName(value)}
            />
            {Platform.OS === 'ios' && (
              <><TouchableOpacity
                style={styles.dropdownContainer}
                onPress={handlePickerOpen}
              >
                <Text style={styles.dropdownText}>{petType || 'Select Pet Type'}</Text>
              </TouchableOpacity><Modal
                transparent={true}
                animationType="slide"
                visible={isPickerVisible}
                onRequestClose={handlePickerClose}
              >
                  <View style={styles.modalOverlay}>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={petType}
                        onValueChange={(value) => {
                          setPetType(value);
                          handlePickerClose();
                        }}
                      >
                        <Picker.Item label="Dog" value="dog" />
                        <Picker.Item label="Cat" value="cat" />
                        <Picker.Item label="Fish" value="fish" />
                      </Picker>
                      <Button title="Close" onPress={handlePickerClose} />
                    </View>
                  </View>
                </Modal></>
            )}
            {Platform.OS === 'android' && (
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={petType}
                  onValueChange={(value) => setPetType(value)}
                  style={styles.dropdownText}>
                  <Picker.Item label="Dog" value="dog" />
                  <Picker.Item label="Cat" value="cat" />
                  <Picker.Item label="Fish" value="fish" />
                </Picker>
              </View>
            )}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Pet DOB</Text>
              <TouchableOpacity
                style={styles.dateSelector}
                onPress={showDatePicker}>
                <Text>{petDOB.toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}</Text>
              </TouchableOpacity>

              {isDatePickerVisible && <DateTimePicker
                testID="dateTimePicker"
                value={petDOB}
                mode="date"
                display="default"
                onChange={onChange}
              />
              }
            </View>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={close}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={submitPet}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              {/* <View style={styles.button}>
              <Button color='red' title="Close" onPress={close}></Button>
            </View>
            <View>
              <Button title="Submit" onPress={submitPet}></Button>
            </View> */}
            </View>
          </View>

        </View>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground
        source={require('../../../assets/Pets-home.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileContainer}>
            <Ionicons name="person-circle-outline" size={70} color="black" style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user ? auth.currentUser.email.split('@')[0] : ''}</Text>
              <Text style={styles.email}>{user ? auth.currentUser.email : ''}</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View>
            <Text style={styles.sectionTitle}>Your Pets</Text>
            <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
              <MaterialIcons name="add" size={24} color="white" />
              <Text style={styles.addButton}> Add</Text>
            </TouchableOpacity>
          </View>

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
}

