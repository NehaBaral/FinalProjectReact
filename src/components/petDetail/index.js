import { View, Text, Pressable, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button } from "react-native"
import styles from "./styles"
import { useState, useContext, useEffect } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StateContext } from "../../../StateContext";


export default PetDetail = ({ navigation, route }) => {
    const pet = route.params.ele;

    console.log('pet', pet)
    const { vaccinations, addNewVaccination, deleteVaccination, getVaccinations } = useContext(StateContext)
    const [vaccinationList, setVaccinationList] = vaccinations
    const [addVaccinationDetail, setVaccinationDetail] = useState(false)
    const [vaccinationName, setVaccinationName] = useState('')
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getVaccinations(pet.id)
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };



    const displayPetDetail = () => {
        return (
            <View>
                <View style={styles.petContainer}>
                    <View>
                        <Text style={styles.titleStyle}>{pet.name}</Text>
                        <Text style={styles.subTitleStyle}>{pet.type}</Text>
                        <Text style={styles.subTitleStyle}>Age: {pet.age}</Text>
                    </View>
                </View>
                <ScrollView>
                    {displayVaccinations()}
                </ScrollView>
            </View >
        )
    }

    const displayVaccinations = () => {
        return vaccinationList.map((ele) => {
            return (
                <View key={ele.id} style={styles.petContainer}>
                    <View >
                        <Text style={styles.titleStyle}>{ele.name}</Text>
                        <Text style={styles.subTitleStyle}>{ele.date}</Text>
                    </View>
                    <View style={styles.deleteBtn}>
                        <Button color={'red'} title="Delete" onPress={() => deleteVaccination(ele.id, pet.id)}></Button>
                    </View>
                </View>
            )
        });
    }

    const handleFABPress = () => {
        setVaccinationDetail(true)
    }

    const handlePetVaccinationChange = (value) => {

        setVaccinationName(value)
    }

    const close = () => {
        setVaccinationDetail(false)
    }

    const submitVaccination = () => {
        console.log('va name', vaccinationName)
        if (vaccinationName && date) {
            addNewVaccination({
                name: vaccinationName,
                date: date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
            }, pet.id)
            setVaccinationDetail(false)
        } else {
            setErrorMessage("All fields are mandatory.")
        }
    }

    if (addVaccinationDetail) {
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.addContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter vaccination name."
                        onChangeText={handlePetVaccinationChange}
                    ></TextInput>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Vaccination Date</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    </View>
                    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button color='red' title="Close" onPress={close}></Button>
                        </View>
                        <View>
                            <Button title="Submit" onPress={submitVaccination}></Button>
                        </View>
                    </View>
                </View>

            </View>)
    } else {
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <ScrollView>
                    {displayPetDetail()}
                </ScrollView>

                <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    }
}