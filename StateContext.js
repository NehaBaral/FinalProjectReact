import { createContext } from "react";
import { db, auth } from './src/database/config'
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import { useState, useEffect } from "react";


export const StateContext = createContext()
export const StateProvider = (props) => {

    const [pets, setPets] = useState([]);
    
    const database = getDatabase()
    const databaseRef = ref(getDatabase());

    const addNewPet = (data) => {
        
        const newPetKey = push(child(databaseRef, 'pets' + auth.currentUser.uid)).key;

        const updates = {};
        updates['/pets/' + auth.currentUser.uid + '/' + newPetKey] = data;
        
        update(databaseRef, updates);

        const newPet = {...data, id: newPetKey}
        setPets(pets => [...pets, newPet])

        

    }

    const deletePet = (id) => {
        
        const updates = {};
        updates['/pets/' + auth.currentUser.uid + '/' + id] = null;
        
        update(databaseRef, updates);
        setPets(pets.filter(item => item.id != id))
    }

    useEffect(() => {

        get(child(databaseRef, `pets`+ '/' + auth.currentUser.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
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
        <StateContext.Provider value={{ pets: [pets, setPets], addNewPet, deletePet }}>
            {props.children}
        </StateContext.Provider>
    )
}