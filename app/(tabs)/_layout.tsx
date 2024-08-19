import { Camera, Cat, Settings } from "@tamagui/lucide-icons";
import { Link, Tabs } from "expo-router";
import { Button } from "tamagui";
import { CatLogo } from "../../components/cat-logo";

const CatImage = () => {
	return (
		<Link asChild href={"/about"}>
			<Button chromeless>
				<CatLogo />
			</Button>
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
