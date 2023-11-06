import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityContainer: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  topContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 75,
  },
  topText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomText: {
    color: 'black',
    fontSize: 14,
  },
  sliderStyle: {
    width: '92%',
    height: 40,
  },
  randomizeButton: {
    width: '80%',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 20,
  },
  findButton: {
    width: '80%',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 6,
    backgroundColor: 'black',
    marginTop: 12,
  },
  headerImage: {
    width: 25,
    height: 25,
  },
  slidersContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default styles;