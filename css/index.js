import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  error: {
    marginBottom:30,
    backgroundColor: '#a94442',
    borderColor: '#a94442',
    borderWidth: 1,
    height: 20,
  },
  errorText: {
    alignSelf: 'center',
    color: 'white',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  fineprint: {
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 10
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  underline: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000"
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  }
})
