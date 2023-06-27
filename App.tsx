import React, { FC } from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import Calculator from './Calculator';

const App: FC = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Calculator />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});

export default App;
