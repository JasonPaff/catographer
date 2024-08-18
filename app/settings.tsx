import { Text, View } from "tamagui";

export default function SettingsScreen() {
	return (
		<View alignItems={"center"} flex={1} justifyContent={"center"}>
			{process.env.EXPO_PUBLIC_DEV === "true" && <Text fontSize={20}>Settings Screen</Text>}
		</View>
	);
}
