import { StyleSheet, Text, View } from "react-native";

export default function Cats() {
	return (
		<View style={styles.container}>
			<Text>Hello!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
	},
});
