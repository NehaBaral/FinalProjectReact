import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6a1b9a',
        borderRadius: 30,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addContainer: {
        flex: 1,
    },
    textInput: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        margin: 8
    },
    errorText: {
        color: 'red',
        marginHorizontal: 16
    },
    buttonContainer: {
        flex: 1,
        margin: 8,
        
    },
    button: {
        borderRadius: 8,
        marginBottom: 16
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        margin: 8,
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'stretch',
        borderRadius: 8
    },
    subTitleStyle: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '500'
    },
    titleStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
    },
    deleteBtn: {alignSelf: 'center'},
    dateContainer: {
        marginBottom: 16,
    },
    dateSelector: {
        backgroundColor: '#cccccc',
        padding: 8,
        borderRadius: 8
    },

})