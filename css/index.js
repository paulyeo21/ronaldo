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
  },
  itemSeparator: {
    height: 10,
    backgroundColor: '#fff',
  },
  shoeItem: {
    padding: 20,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 3
  },
  filterButton: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  filterButtonText: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 3,
  },
  searchBarContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  searchBarInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    height: 20
  },
  searchBarIcon: {
    position: 'absolute',
    top: 11,
    left: 12
  },
  searchBarClearIcon: {
    position: 'absolute',
    top: 11,
  },
  flatListFooter: {
    paddingTop: 85
  }
})
