import { View, Text, Pressable, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button } from "react-native"
import styles from "./styles"
import { useState } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';



export default PetDetail = ({ navigation, route }) => {
    const [addVaccinationDetail, setVaccinationDetail] = useState(false)
    const [vaccinationName, setVaccinationName] = useState('')
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleDatepicker = () => {
        setShowDatePicker(true);
    };

    const displayPetDetail = () => {
        return (
            <View>
                <View style={styles.petContainer}>
                    <View>
                        <Text style={styles.titleStyle}>Jule</Text>
                        <Text style={styles.subTitleStyle}>Cat</Text>
                        <Text style={styles.subTitleStyle}>Age: 3</Text>
                    </View>
                </View>
                <ScrollView>
                    {displayVaccinations()}
                </ScrollView>
            </View >
        )
    }

    const displayVaccinations = () => {
        return (
            <View style={styles.petContainer}>
                <View >
                    <Text style={styles.titleStyle}>Vaccination name</Text>
                    <Text style={styles.subTitleStyle}>12-02-2024</Text>
                </View>
                <View style={styles.deleteBtn}>
                    <Button color={'red'} title="Delete"></Button>
                </View>
            </View>
        )
    }

    const handleFABPress = () => {
        setVaccinationDetail(true)
    }

    const handlePetVaccinationChange = () => {

    }

    const close = () => {
        setVaccinationDetail(false)
    }

    const submitVaccination = () => {
        if (vaccinationName && date) {
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