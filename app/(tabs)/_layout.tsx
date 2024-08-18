import { Camera, Cat, Home, Settings } from "@tamagui/lucide-icons";
import { Link, Tabs } from "expo-router";
import { Button, Image } from "tamagui";

const CatImage = () => {
	return <Image height={25} marginLeft={"$3"} source={require("../../assets/images/cat-icon.png")} width={25} />;
};

const SettingsLink = () => {
	return (
		<Link asChild href={"/settings"}>
			<Button iconAfter={Settings} marginRight={"$3"} scaleIcon={1.8} size={"$3"} />
		</Link>
	);
};

export default function TabLayout() {
	return (
		<Tabs initialRouteName={"home"}>
			<Tabs.Screen
				name={"index"}
				options={{
					headerLeft: CatImage,
					headerRight: SettingsLink,
					title: "Home",
					tabBarIcon: ({ color }) => <Home color={color} />,
				}}
			/>
			<Tabs.Screen
				name={"take-photo"}
				options={{
					headerLeft: CatImage,
					headerRight: SettingsLink,
					tabBarIcon: ({ color }) => <Camera color={color} />,
					title: "Take Photo",
				}}
			/>
			<Tabs.Screen
				name={"cats"}
				options={{
					headerLeft: CatImage,
					headerRight: SettingsLink,
					tabBarIcon: ({ color }) => <Cat color={color} />,
					title: "Cats",
				}}
			/>
		</Tabs>
	);
}
