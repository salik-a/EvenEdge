import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    borderWidth: 0.4,
    backgroundColor: '#00000005',
    maxWidth: '75%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  gptMessageContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 20,
    marginLeft: 10,
  },
});

export default styles;