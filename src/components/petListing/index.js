import { View, TouchableOpacity, SafeAreaView, TextInput, Button, ScrollView, Text } from "react-native";
import styles from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

export default function PetListing({ navigation }) {

    const [addPet, setAddPet] = useState(false)
    const [petName, setPetName] = useState('')
    const [petType, setPetType] = useState('')
    const [petAge, setPetAge] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFABPress = () => {
        setAddPet(true)
    }

    const close = () => {
        setAddPet(false)
    }

    const submitPet = () => {
        if (petName && petType && petAge) {
            setPetName('')
            setPetType('')
            setPetAge('')
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

    const displayPets = (navigation) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                onPress={() => { navigation.navigate('PetDetail') }}
            >
                <View >
                    <Text style={styles.titleStyle}>Jule</Text>
                    <Text style={styles.subTitleStyle}>Cat</Text>
                    <Text style={styles.subTitleStyle}>Age: 3</Text>
                </View>
                <View style={styles.deleteBtn}>
                    <Button color={'red'} title="Delete"></Button>
                </View>
            </TouchableOpacity>
        )
    }

    if (addPet) {
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.addContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter pet name."
                        onChangeText={handlePetNameChange}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter pet type."
                        onChangeText={handlePetTypeChange}
                    ></TextInput>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter pet age."
                        keyboardType="numeric"
                        onChangeText={handlePetAgeChange}
                    ></TextInput>
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
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <ScrollView>
                    {displayPets(navigation)}
                </ScrollView>

                <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }



}