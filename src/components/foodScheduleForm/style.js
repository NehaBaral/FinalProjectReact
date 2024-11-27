import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
      },
      mealCountBg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
        backgroundColor: "#fff",
      },
      addCountBtn: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical : 10,
        marginHorizontal : 16
      },
      itemContainer: {
        padding: 8,
        backgroundColor: "#E3EDDA",
        borderRadius: 4,
      },
      separator: {
        height: 8,
      },
      list: {
        marginTop: 16,
      },
      updateButton: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical : 10,
        marginHorizontal : 16
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    updateTimeButton: {
      backgroundColor : "#7f5815",
      padding: 12,
      borderRadius: 10,
      alignItems: 'flex-end',
      marginVertical : 10,
      marginHorizontal : 16
    }
})