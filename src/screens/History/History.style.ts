import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerCancel: {
    fontSize: 18,
    marginLeft: 4,
  },
  headerImage: {
    width: 25,
    height: 25,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 20,
  },
  trashImage: {
    width: 50,
    height: 50,
  },
  deleteTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  deleteText: {
    textAlign: 'center',
    marginTop: 10,
  },
  randomizeButton: {
    width: '40%',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 6,
  },
  findButton: {
    width: '40%',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 6,
    backgroundColor: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default styles;