import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, FlatList, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import styles from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StateContext } from "../../../StateContext";
import Counter from "react-native-counters";

export default function FoodScheduleForm({ navigation, route }) {
    const pet = route.params.ele;
    const { addSchedule, getSchedule, updateSchedule } = useContext(StateContext)
    const [foodCount, setFoodCount] = useState(0);
    const [mealData, setMealData] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState({});
    const list = useRef(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        async function fetchSchedule() {
            try {
                setLoading(true)
                const foodSchedule = await getSchedule(pet.id)
                setMealData(foodSchedule);
                setFoodCount(foodSchedule.length)
            } catch (e) {
                setErrorMessage("Failed to load food schedule.");
            } finally {
                setLoading(false)
            }
        }
        fetchSchedule()
    }, [])

    // Function to update mealData based on foodCount
    const handleGenerateMeals = () => {
        if (foodCount < 0) {
            setErrorMessage("Please enter a valid number of meals.");
            return;
        }

        const meals = Array.from({ length: foodCount }, (_, i) => ({
            id: i.toString(),
            foodType: `${i + 1} meal`,
            foodName: "",
            time: new Date(),
        }));
        setMealData(meals);
        setShowTimePicker({});
        setFoodCount(0);
    };

    // function to update time for a specific meal
    const handleTimeChange = (event, selectedTime, index) => {
        if (selectedTime) {
            const updatedData = [...mealData];
            updatedData[index].time = selectedTime;
            setMealData(updatedData);
        }
        setShowTimePicker((prev) => ({ ...prev, [index]: false }));
    };

    // Update individual meal input
    const handleInputChange = (text, index) => {
        const updatedData = [...mealData];
        updatedData[index].foodName = text;
        setMealData(updatedData);
    };

    // Handle Add Schedule action
    const OnAddSchedule = () => {
        // Validate the form before submitting
        if (mealData.some((meal) => !meal.foodName || !meal.time)) {
            Alert.alert("Please fill out all fields for each meal.");
            return;
        }

        setLoading(true)

        try {
            if (mealData.length < 0) {
                mealData.forEach((meal) => {
                    const { ...data } = meal;
                    addSchedule(data, pet.id);
                });
            } else {
                mealData.forEach((meal) => {
                    updateSchedule(meal, pet.id, meal.id)
                })
            }
            setErrorMessage("");
            navigation.goBack();
        } catch (error) {
            setErrorMessage("Failed to save meal schedule.")
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text>{item.foodType}</Text>
            <TextInput
                placeholder={`Enter details for ${item.foodType}`}
                value={item.foodName}
                onChangeText={(text) => handleInputChange(text, index)}
                style={styles.input}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 16 }}>{`Time :  ${item.time
                    ? new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "Set Time"
                    }`}</Text>
                <TouchableOpacity
                    style={styles.updateTimeButton}
                    onPress={() =>
                        setShowTimePicker((prev) => ({ ...prev, [index]: true }))}
                >
                    <Text style={styles.buttonText}>Select Time </Text>
                </TouchableOpacity>
            </View>
            {showTimePicker[index] && (
                <DateTimePicker
                    value={item.time instanceof Date && !isNaN(item.time) ? item.time : new Date()} // Default time fallback
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) =>
                        handleTimeChange(event, selectedTime, index)
                    }
                />
            )}
        </View>
    );

    const Separator = () => {
        return <View style={{ height: 2, backgroundColor: "#023020" }} />;
    };

    const onChange = (number, type) => {
        setFoodCount(Number(number))
    }

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Login.....</Text>
                </View>
            )}
            <Text style={styles.heading}>Set Meal Schedule</Text>
            <View style={styles.mealCountBg}>
                <Counter key={foodCount}
                    start={foodCount}
                    onChange={onChange.bind(this)} buttonStyle={{
                        borderColor: '#333',
                        borderWidth: 2,
                    }} buttonTextStyle={{
                        color: '#333',
                    }}
                    countTextStyle={{
                        color: '#333',
                    }} />
                <TouchableOpacity style={styles.addCountBtn} onPress={handleGenerateMeals}>
                    <View>
                        <Text style={styles.buttonText}>Generate Forms</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                ref={list}
                keyExtractor={(item) => item.id}
                data={mealData}
                renderItem={renderItem}
                ItemSeparatorComponent={Separator}
                style={styles.list}
            />
            {mealData.length > 0 && (
                <TouchableOpacity style={styles.updateButton} onPress={OnAddSchedule} disabled={loading}>
                    <View>
                        <Text style={styles.buttonText}>{mealData.length < 1 ? "Add Schedule" : "Update Schedule"}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}
