import { View, Text, Pressable, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput, Button } from "react-native"
import styles from "./styles"
import { useState, useContext, useEffect } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StateContext } from "../../../StateContext";


export default PetDetail = ({ navigation, route }) => {
    const pet = route.params.ele;

    const { vaccinations, addNewVaccination, deleteVaccination, getVaccinations } = useContext(StateContext)
    const [vaccinationList, setVaccinationList] = vaccinations
    const [addVaccinationDetail, setVaccinationDetail] = useState(false)
    const [vaccinationName, setVaccinationName] = useState('')
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getVaccinations(pet?.id)
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
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

      const OnAddSchedule = () => {
        navigation.navigate("MealTracking", { ele: pet });
      }

    const displayPetDetail = () => {
        const defaultImage = checkType(pet.type)

        const imageUri = pet.image ? { uri: pet.image } : defaultImage;
        return (
            <View style={styles.petContainer}>
                <View style={styles.headerContainer}>
                    <View>
                    <Text style={styles.petName}>{pet?.name}</Text>
                    <Text style={styles.petType}>{pet?.type}</Text>
                    <Text style={styles.petAge}>Age: {pet?.age}</Text>
                    </View>
                    <Image source={imageUri} style={styles.petImage} />
                </View>
            
                <TouchableOpacity style={styles.addScheduleBtn} onPress={OnAddSchedule}>
                        <Text style = {{color : 'white'}}>Create schedule for food tracking</Text>
                    </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.vaccinationList}>
                    {displayVaccinations()}
                </ScrollView>
            </View>
        );
    }

    const displayVaccinations = () => {
        return vaccinationList.map((ele) => (
            <View key={ele.id} style={styles.vaccinationCard}>
                <Text style={styles.vaccinationName}>{ele.name}</Text>
                <Text style={styles.vaccinationDate}>{ele.date}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteVaccination(ele.id, pet.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        ));
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
            <ImageBackground source={require('../../../assets/bg.jpg')} style={styles.background}>
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
            </View>
            </ImageBackground>)
    } else {
        return (
            <ImageBackground source={require('../../../assets/bg.jpg')} style={styles.background}>
            <View style={styles.container}>
                <SafeAreaView />
                <ScrollView>
                    {displayPetDetail()}
                </ScrollView>

                <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
            </ImageBackground>
        )
    }
}