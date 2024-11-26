import { View, TouchableOpacity, SafeAreaView, TextInput, Button, ScrollView, Text } from "react-native";
import styles from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useContext } from "react";
import { StateContext } from "../../../StateContext";

export default function PetListing({ navigation }) {

    const { pets, addNewPet, deletePet } = useContext(StateContext)
    const [petList, setPetList] = pets
    const [addPet, setAddPet] = useState(false)
    const [petName, setPetName] = useState('')
    const [petType, setPetType] = useState('')
    const [petAge, setPetAge] = useState('')
    const [petImage, setPetImage] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

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
            setPetType('')
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

    const displayPets = (navigation) => {
        return petList.map((ele) => {
            return (
                <TouchableOpacity style={styles.itemContainer}
                    onPress={() => { navigation.navigate('PetDetail', { ele }) }}
                    key={ele.id}
                >
                    <View>
                        <Text style={styles.titleStyle}>{ele.name}</Text>
                        <Text style={styles.subTitleStyle}>{ele.type}</Text>
                        <Text style={styles.subTitleStyle}>Age: {ele.age}</Text>
                    </View>
                    <View style={styles.deleteBtn}>
                        <Button
                            color={'red'}
                            title="Delete"
                            onPress={() => deletePet(ele.id)}
                        ></Button>
                    </View>
                </TouchableOpacity>
            )
        });
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