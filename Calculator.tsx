import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';

interface Button {
	inputValue: string;
	displayText?: string;
	style: any;
	handler: (value: string) => void;
}

const Calculator: React.FC = () => {
	const [input, setInput] = useState('0');

	const handleInput = (value: string) => {
		if (value === 'C') {
			setInput('0');
		} else if (value === '%') {
			const percentage = parseFloat(input) / 100;
			setInput(percentage.toString());
		} else if (value === '±') {
			const number = parseFloat(input);
			const invertedNumber = -1 * number;
			setInput(invertedNumber.toString());
		} else {
			setInput(input === '0' ? value : input + value);
		}
	};

	const handleCalculate = () => {
		try {
			const result = eval(input);
			setInput(Number.isFinite(result) ? result.toString() : 'Error');
		} catch (error) {
			setInput('Error');
		}
	};

	const layout: Button[][] = [
		[
			{ inputValue: 'C', style: [styles.button, styles.clearButton], handler: handleInput },
			{ inputValue: '±', style: [styles.button, styles.signButton], handler: handleInput },
			{ inputValue: '%', style: [styles.button, styles.percentButton], handler: handleInput },
			{
				inputValue: '/',
				displayText: '÷',
				style: [styles.button, styles.operatorButton],
				handler: handleInput,
			},
		],
		[
			{ inputValue: '7', style: styles.button, handler: handleInput },
			{ inputValue: '8', style: styles.button, handler: handleInput },
			{ inputValue: '9', style: styles.button, handler: handleInput },
			{
				inputValue: '*',
				displayText: '×',
				style: [styles.button, styles.operatorButton],
				handler: handleInput,
			},
		],
		[
			{ inputValue: '4', style: styles.button, handler: handleInput },
			{ inputValue: '5', style: styles.button, handler: handleInput },
			{ inputValue: '6', style: styles.button, handler: handleInput },
			{ inputValue: '-', style: [styles.button, styles.operatorButton], handler: handleInput },
		],
		[
			{ inputValue: '1', style: styles.button, handler: handleInput },
			{ inputValue: '2', style: styles.button, handler: handleInput },
			{ inputValue: '3', style: styles.button, handler: handleInput },
			{ inputValue: '+', style: [styles.button, styles.operatorButton], handler: handleInput },
		],
		[
			{ inputValue: '0', style: [styles.button, styles.zeroButton], handler: handleInput },
			{ inputValue: '.', style: styles.button, handler: handleInput },
			{
				inputValue: '=',
				style: [styles.button, styles.operatorButton, styles.equalButton],
				handler: handleCalculate,
			},
		],
	];

	const fontSize = input.length > 7 ? (7 / input.length) * buttonSize : buttonSize * 1.07;

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={[styles.input, { fontSize }]}>{input}</Text>
			</View>
			<View style={styles.buttonContainer}>
				{layout.map((rows, index) => (
					<View style={styles.row} key={index}>
						{rows.map((row) => (
							<TouchableOpacity
								key={row.inputValue}
								style={row.style}
								onPress={() => row.handler(row.inputValue)}
							>
								<Text style={styles.buttonText}>
									{row?.displayText ? row.displayText : row.inputValue}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
			<Text style={styles.text}>
				Створено спеціально для курсового проекту з дисципліни "Розробка застосувань для мобільних
				пристроїв"
			</Text>
		</View>
	);
};

const { width } = Dimensions.get('window');
const buttonSize = width * 0.205;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		width: '100%',
		gap: 8,
	},
	inputContainer: {
		padding: 12,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flex: 0.5,
	},
	input: {
		fontSize: 55,
		fontWeight: '300',
		color: '#fff',
	},
	buttonContainer: {
		flex: 1,
		padding: 12,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	button: {
		width: buttonSize,
		height: buttonSize,
		backgroundColor: '#2d2d2d',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: buttonSize / 2,
	},
	buttonText: {
		fontSize: 0.5 * buttonSize,
		color: '#fff',
	},
	clearButton: {
		backgroundColor: '#a6a6a6',
	},
	signButton: {
		backgroundColor: '#a6a6a6',
	},
	percentButton: {
		backgroundColor: '#a6a6a6',
	},
	operatorButton: {
		backgroundColor: '#ff9500',
	},
	equalButton: {
		backgroundColor: '#ff9500',
	},
	zeroButton: {
		width: 2 * buttonSize + 12,
	},
	text: {
		fontSize: 9,
		textAlign: 'center',
		color: '#464646',

		width: '72%',
		alignSelf: 'center',
	},
});

export default Calculator;
