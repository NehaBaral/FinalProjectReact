import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingVertical: 50,
  },
  profileContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(248, 248, 249, 0.9)',
    padding: 20,
    paddingVertical: 12,
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
    marginTop: 13,
    marginBottom: 15,
  },
  petList: {
    paddingHorizontal: 5,
  },
  petCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    padding: 15,
    alignItems: 'center',
    width: 150,
    height: 200,
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
    bottom: 20,
    right: 20,
    backgroundColor: '#6a1b9a',
    borderRadius: 30,
    padding: 20,
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
    margin: 8
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
    marginTop: 10,
    marginBottom: 20,
  },
  petHeader: {
    fontSize: 30,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  dropdown: {
    height: 53,
    width: '100%',
    fontSize: 12
  },
  dateContainer: {
    marginBottom: 16,
    marginTop: 8,
    marginHorizontal: 8
  },
  dateSelector: {
    backgroundColor: '#cccccc',
    padding: 16,
    marginTop: 8,
    borderRadius: 8
  },
  logoutBtn: {
    color: 'red',
    borderRadius: 8
  }
});
