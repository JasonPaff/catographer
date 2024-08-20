import { Link, Tabs } from "expo-router";
import { Camera, Cat, Settings } from "lucide-react-native";
import { Pressable } from "react-native";
import { CatLogo } from "../../components/shared/cat-logo/cat-logo";

const CatImage = () => {
	return (
		<Link asChild href={"/about"}>
			<Pressable>
				<CatLogo />
			</Pressable>
		</Link>
	);
};

export default function TabLayout() {
	return (
		<Tabs initialRouteName={"index"}>
			<Tabs.Screen
				name={"index"}
				options={{
					headerRight: CatImage,
					title: "Cats",
					tabBarIcon: ({ color }) => <Cat color={color} />,
				}}
			/>
			<Tabs.Screen
				name={"camera"}
				options={{
					headerShown: false,
					lazy: true,
					tabBarIcon: ({ color }) => <Camera color={color} />,
					title: "Camera",
				}}
			/>
			<Tabs.Screen
				name={"settings"}
				options={{
					headerRight: CatImage,
					tabBarIcon: ({ color }) => <Settings color={color} />,
					title: "Settings",
					unmountOnBlur: true,
				}}
			/>
		</Tabs>
	);
}
