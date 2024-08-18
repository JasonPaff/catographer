import { Link, Stack } from "expo-router";
import { Button, Text, View } from "tamagui";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View alignItems={"center"} display={"flex"} flex={1} gap={"$5"} justifyContent={"center"} margin={10}>
				<Text fontSize={20}>This screen doesn't exist.</Text>
				<Link asChild href={"/(tabs)/"}>
					<Button>Go to home screen</Button>
				</Link>
			</View>
		</>
	);
}
