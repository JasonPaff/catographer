import { StyleSheet, Text, View } from "react-native";

export function Settings() {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Settings Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	heading: {
		color: "white",
		fontSize: 20,
	},
});
