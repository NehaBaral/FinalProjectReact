import { View, Text, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput, Button } from "react-native"
import styles from "./styles"
import { useState, useContext, useEffect } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StateContext } from "../../../StateContext";
import { Timestamp } from 'firebase/firestore'


export default PetDetail = ({ navigation, route }) => {
    const pet = route.params.ele;

    const { deletePet } = useContext(StateContext)
    const { vaccinations, addNewVaccination, deleteVaccination, getVaccinations } = useContext(StateContext)
    const [vaccinationList, setVaccinationList] = vaccinations
    const [addVaccinationDetail, setVaccinationDetail] = useState(false)
    const [vaccinationName, setVaccinationName] = useState('')
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        getVaccinations(pet?.id)
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        hideDatePicker();
    };

    const onDeletePet = (id) => {
        deletePet(id)
        navigation.goBack();
    }

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

    const OnAddSchedule = () => {
        navigation.navigate("MealTracking", { ele: pet });
    }

    const showDatePicker = () => {
        setDate(new Date())
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const getVaccinationDate = (value) => {

        const milliseconds = value?.seconds * 1000 + value?.nanoseconds / 1000000;

        const date = new Date(milliseconds);

        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        return <Text style={styles.vaccinationDate}>{formattedDate}</Text>


    }

    const getDOB = (value) => {
        const milliseconds = value?.seconds * 1000 + value?.nanoseconds / 1000000;
        const date = new Date(milliseconds);

        const formattedDate = date.toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        return <Text style={styles.petDOB}>DOB: {formattedDate}</Text>
    }

    const displayPetDetail = () => {
        const defaultImage = checkType(pet.type)

        return (
            <View>
                <View style={styles.petContainer}>
                    <View style={styles.headerContainer}>
                        <View>
                            <Text style={styles.petName}>{pet?.name}</Text>
                            <Text style={styles.petType}>{pet?.type}</Text>
                            {getDOB(pet.dob)}
                        </View>
                        <Image source={defaultImage} style={styles.petImage} />
                    </View>

                    <TouchableOpacity style={styles.addScheduleBtn} onPress={OnAddSchedule}>
                        <Text style={{ color: 'white' }}>Food Schedule</Text>
                    </TouchableOpacity>

                    <ScrollView>
                        {displayVaccinations()}
                    </ScrollView>
                    <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                        <MaterialIcons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.deletePetButton} onPress={() => onDeletePet(pet.id)} >
                    <Text style={styles.deletePetText}> Delete Pet </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const displayVaccinations = () => {
        if (vaccinationList.length == 0) {
            return <Text>No vaccination history to display</Text>
        } else {
            return vaccinationList.map((ele) => (
                <View key={ele.id} style={styles.vaccinationCard}>
                    <Text style={styles.vaccinationName}>{ele.name}</Text>
                    {getVaccinationDate(ele.date)}
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteVaccination(ele.id, pet.id)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            ));
        }
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
                date: Timestamp.fromDate(date)
            }, pet.id)
            setVaccinationDetail(false)
        } else {
            setErrorMessage("All fields are mandatory.")
        }
    }

    if (addVaccinationDetail) {
        return (
            <ImageBackground source={require('../../../assets/Pets-detail.jpg')} style={styles.background}>
                <SafeAreaView />

                <View style={styles.container}>
                    <View style={styles.addContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter vaccination name."
                            onChangeText={handlePetVaccinationChange}
                        ></TextInput>

                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>Vaccination Date</Text>
                            <TouchableOpacity
                                style={styles.dateSelector}
                                onPress={showDatePicker}>
                                <Text>{date.toLocaleString('en', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}</Text>
                            </TouchableOpacity>

                            {isDatePickerVisible && <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                            }
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
                </View>
            </ImageBackground>)
    } else {
        return (
            <ImageBackground source={require('../../../assets/Pets-detail.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <SafeAreaView />
                    <ScrollView>
                        {displayPetDetail()}
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}