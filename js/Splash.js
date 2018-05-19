import React from 'react';
import {
	StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
	},
});

const Splash = () => (
	<View style={styles.container}>
    <ActivityIndicator />
	</View>
);

export default Splash;
