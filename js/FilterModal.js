import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  ScrollView,
  Switch
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import SizesPicker from './SizesPicker';

/* <FilterModal />
============================================================================= */
class FilterModal extends Component {
  render() {
    return (
      <Modal animationType='slide' visible={ this.props.visible } onDismiss={ this.props.handleOnDismiss } >
        <SafeAreaView style={ styles.modalScreenContainer }>
          <View style={ styles.header }>
            <TouchableHighlight>
              <Icon name='x' type='feather' onPress={ this.props.handleOnPressX } />
            </TouchableHighlight>
            <TouchableHighlight>
              <Text onPress={ this.props.handleOnPressClear }>Clear</Text>
            </TouchableHighlight>
          </View>
          <ScrollView style={ styles.scrollView }>
            <View style={ styles.sectionContainer }>
              <View>
                <Text style={ styles.sectionSubtitle }>Deadstock</Text>
                <Text style={ styles.sectionDescription }>Unworn and complete with original box</Text>
              </View>
              <Switch
                value={ this.props.filters.ds }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'ds') }}
              />
            </View>
            <View style={ styles.sectionContainer }>
              <View>
                <Text style={ styles.sectionSubtitle }>Very Near Deadstock</Text>
                <Text style={ styles.sectionDescription }>Have been worn but as good as new</Text>
              </View>
              <Switch
                value={ this.props.filters.vnds }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'vnds') }}
              />
            </View>
            <View style={ styles.sectionContainer }>
              <Text style={ styles.sectionSubtitle }>Sizes</Text>
            </View>
            <View style={ styles.sectionContainer }>
              <SizesPicker
                sizes={ this.props.sizes }
                handleOnPressSize={ this.props.handleOnPressSize }
              />
            </View>
            <View style={ styles.sectionContainer }>
              <Text style={ styles.sectionSubtitle }>Male</Text>
              <Switch
                value={ this.props.filters.male }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'male') }}
              />
            </View>
            <View style={ styles.sectionContainer }>
              <Text style={ styles.sectionSubtitle }>Female</Text>
              <Switch
                value={ this.props.filters.female }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'female') }}
              />
            </View>
            <View style={ styles.sectionContainer }>
              <Text style={ styles.sectionSubtitle }>Nike</Text>
              <Switch
                value={ this.props.filters.nike }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'nike') }}
              />
            </View>
            <View style={ styles.sectionContainer }>
              <Text style={ styles.sectionSubtitle }>Adidas</Text>
              <Switch
                value={ this.props.filters.adidas }
                onValueChange={ (value) => { this.props.handleToggleChange(value, 'adidas') }}
              />
            </View>
          </ScrollView>
          <TouchableHighlight onPress={ this.props.handleApplyingFilters } style={ styles.button }>
            <Text style={ styles.buttonText }>Apply</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </Modal>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  modalScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 44
  },
  scrollView: {
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionSubtitle: {
    fontSize: 18,
    paddingBottom: 5
  },
  sectionDescription: {
    fontSize: 14,
    paddingBottom: 10
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

/* Exports
============================================================================= */
export default FilterModal;
