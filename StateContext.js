import { createContext } from "react";
import { db, auth } from './src/database/config'
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import { useState, useEffect } from "react";


export const StateContext = createContext()
export const StateProvider = (props) => {

    const [pets, setPets] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [foodSchedule, setFoodSchdeule] = useState([])

    const database = getDatabase()
    const databaseRef = ref(getDatabase());

    const addNewPet = (data) => {

        const newPetKey = push(child(databaseRef, 'pets' + auth.currentUser.uid)).key;

        const updates = {};
        updates['/pets/' + auth.currentUser.uid + '/' + newPetKey] = data;

        update(databaseRef, updates);

        const newPet = { ...data, id: newPetKey }
        setPets(pets => [...pets, newPet])



    }

    const deletePet = (petId) => {

        const updates = {};
        updates['/pets/' + auth.currentUser.uid + '/' + petId] = null;
        updates['/vaccinations/' + auth.currentUser.uid + '/' + petId] = null;

        update(databaseRef, updates);
        setPets(pets.filter(item => item.id != petId))
        setVaccinations([])
    }

    const getPetsByUser = (uid) => {
        const userPetsRef = child(ref(database), `pets/${uid}`);

        get(userPetsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const petArray = Object.keys(data).map((key) => ({
                        ...data[key],
                        id: key,
                    }));
                    setPets(petArray);
                } else {
                    setPets([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching pets:", error);
                setPets([]);
            });
    };

    const addNewVaccination = (data, petId) => {

        const newVacKey = push(child(databaseRef, 'vaccinations' + auth.currentUser.uid + '/' + petId)).key;

        const updates = {};
        updates['/vaccinations/' + auth.currentUser.uid + '/' + petId + '/' + newVacKey] = data;

        update(databaseRef, updates);

        const newVac = { ...data, id: newVacKey }
        setVaccinations(vaccinations => [...vaccinations, newVac])



    }

    const addSchedule = (data, petId) => {
        const newSchKey = push(child(databaseRef, 'foodSchedule' + auth.currentUser.uid + '/' + petId)).key;

        const updates = {};
        updates['/foodSchedule/' + auth.currentUser.uid + '/' + petId + '/' + newSchKey] = data;

        update(databaseRef, updates);

        const newSch = { ...data, id: newSchKey }
        setFoodSchdeule(foodSchedule => [...foodSchedule, newSch])

    }

    const deleteVaccination = (vaccinationId, petId) => {

        const updates = {};
        updates['/vaccinations/' + auth.currentUser.uid + '/' + petId + '/' + vaccinationId] = null;

        update(databaseRef, updates);
        setVaccinations(vaccinations.filter(item => item.id != vaccinationId))
    }

    const getVaccinations = (petId) => {
        get(child(databaseRef, `vaccinations` + '/' + auth.currentUser.uid + '/' + petId)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const vacArray = [];
                for (let key in data) {
                    vacArray.push({ ...data[key], id: key });
                }
                setVaccinations(vacArray);
            } else {
                setVaccinations([])
            }
        }).catch((error) => {
            console.error(error);
            setVaccinations([])
        });
    }

    const updateSchedule = (updatedData, petId, scheduleId) => {
        const path = `foodSchedule/${auth.currentUser.uid}/${petId}/${scheduleId}`;
        const scheduleRef = ref(database, path);
    
        update(scheduleRef, updatedData)
            .then(() => {
                console.log("Schedule updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating schedule:", error);
            });
    };

    const getSchedule = async (petId) => {
        try {
            const snapshot = await get(child(databaseRef, `foodSchedule/${auth.currentUser.uid}/${petId}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                return Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key,
                }));
            } else {
                console.log("No Schedule available");
                return [];
            }
        } catch (error) {
            console.error("Error fetching schedule:", error);
            return [];
        }
    };
    

    useEffect(() => {

        get(child(databaseRef, `pets` + '/' + auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const petArray = [];
                for (let key in data) {
                    petArray.push({ ...data[key], id: key });
                }
                setPets(petArray);

            } else {
                console.log("No pets available");
            }
        }).catch((error) => {
            console.error(error);
        });



    }, []);

    return (
        <StateContext.Provider value={{ pets: [pets, setPets], vaccinations: [vaccinations, setVaccinations], addNewPet, deletePet, addNewVaccination, deleteVaccination, getVaccinations, getPetsByUser, addSchedule, getSchedule, updateSchedule }}>
            {props.children}
        </StateContext.Provider>
    )
}