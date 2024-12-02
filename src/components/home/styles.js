import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export default styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 10,
    paddingVertical: 50,
  },
  profileContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    height: 110,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: 'serif',
    fontWeight: 'semibold',
    color: '#444',
    marginTop: 10,
    marginRight: 80
  },
  email: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    marginBottom: 20,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    padding: 15,
    alignItems: 'center',
    width: 150,
    height: 230,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  petImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 2,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginRight: 5,
  },
  petDOB: {
    fontSize: 15,
    color: '#777',
  },
  petType: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius:10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petContainer: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 5
  },
  addContainer: {
    flex: 1,
  },
  textInput: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    margin: 8,
    backgroundColor: '#fff'
  },
  errorText: {
    color: 'red',
    marginHorizontal: 16
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  closeButton: {
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  petHeader: {
    fontSize: 30,
    color: '#ffff',
    marginTop: 10,
    marginHorizontal: 50,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: Platform.OS == 'ios' ? 10: 2,
    paddingVertical: Platform.OS == 'ios' ? 10 : 0
  },
  dropdownText: {
      fontSize: 16,
      color: '#333',
    },
  dateContainer: {
    marginBottom: 16,
    marginTop: 8,
    marginHorizontal: 8
  },
  dateSelector: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
    borderRadius: 8
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 6,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickerContainer: {
      backgroundColor: '#fff',
      margin: 20,
      borderRadius: 10,
      padding: 20,
    },
    dateText: {
      color: '#fff',
      paddingHorizontal: 5,
      paddingVertical: 5,
      fontWeight: '600',
      fontSize: 18
    },

});