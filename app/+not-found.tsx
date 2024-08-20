import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text style={styles.heading}>This screen doesn't exist.</Text>
				<Link asChild href={"/(tabs)/"}>
					<Pressable>Go to home screen</Pressable>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		gap: 10,
		justifyContent: "center",
		margin: 10,
	},
	heading: {
		fontSize: 20,
	},
});
