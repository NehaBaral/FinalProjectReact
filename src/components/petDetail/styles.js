import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center', 
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    petContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        height: 550,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:2
    },
    petName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 1
    },
    petType: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#555',
        marginBottom: 10
    },
    petDOB: {
        fontSize: 16,
        color: '#888',
    },
    petImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
    },
    basicContainer: {
        flexDirection: 'row',
    },
    vaccinationCard: {
     
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    vaccinationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    vaccinationDate: {
        fontSize: 16,
        color: '#777',
    },
    deleteButton: {
        marginTop: 8,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deletePetButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 8,
        height: '8%',
        borderRadius: 10,
        alignItems: 'center',
    },
    deletePetText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 16,
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        padding: 16,
        elevation: 6,
    },
    addContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    dateContainer: {
        marginBottom: 16,
    },
    dateSelector: {
        backgroundColor: '#cccccc',
        padding: 8,
        borderRadius: 8
    },
    dateText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 8,
    },
    addScheduleBtn: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical : 10,
        marginHorizontal : 16
    }
})