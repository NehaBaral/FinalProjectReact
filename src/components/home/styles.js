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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(248, 248, 249, 0.9)',
    padding: 20,
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 72,
    height: 72,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 40,
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
  petAge: {
    fontSize: 15,
    color: '#777',
  },
  petType: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
