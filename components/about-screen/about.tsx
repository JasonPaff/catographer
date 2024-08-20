import { StyleSheet, Text, View } from "react-native";
import { CatLogo } from "../shared/cat-logo/cat-logo";

export function About() {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Catographer</Text>
			<Text style={styles.h3}>Developed By: Jason Paff</Text>
			<CatLogo height={350} marginTop={25} width={350} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		marginTop: 25,
	},
	h1: {
		color: "white",
		fontSize: 48,
		fontWeight: "bold",
	},
	h3: {
		color: "white",
		fontSize: 18,
		fontWeight: "semibold",
	},
});
