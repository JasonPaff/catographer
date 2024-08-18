import { Camera, Cat, Settings } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { Image } from "tamagui";

const CatImage = () => {
	return (
		<Image height={"$2"} marginRight={"$2.5"} source={require("../../assets/images/cat-icon.png")} width={"$2"} />
	);
};

export default function TabLayout() {
	return (
		<Tabs initialRouteName={"index"}>
			<Tabs.Screen
				name={"index"}
				options={{
					headerRight: CatImage,
					lazy: true,
					title: "Cats",
					tabBarIcon: ({ color }) => <Cat color={color} />,
				}}
			/>
			<Tabs.Screen
				name={"camera"}
				options={{
					headerRight: CatImage,
					lazy: true,
					tabBarIcon: ({ color }) => <Camera color={color} />,
					title: "Camera",
				}}
			/>
			<Tabs.Screen
				name={"settings"}
				options={{
					headerRight: CatImage,
					lazy: true,
					tabBarIcon: ({ color }) => <Settings color={color} />,
					title: "Settings",
				}}
			/>
		</Tabs>
	);
}
