import { Stack } from "expo-router";
import { KeepAwake } from "../components/shared/keep-awake";
import { AppProvider } from "../providers/app-provider";
import "../global.css";

// catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// ensure that reloading on `/settings` keeps a back button present.
export const unstable_settings = {
	initialRouteName: "(tabs)",
};

// prevent the splash screen from auto-hiding before asset loading is complete.
// void preventAutoHideAsync();

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack initialRouteName={"(tabs)"}>
				<Stack.Screen
					name={"(tabs)"}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name={"about"}
					options={{
						animation: "slide_from_right",
						gestureDirection: "horizontal",
						gestureEnabled: true,
						presentation: "modal",
						title: "About",
					}}
				/>
			</Stack>

			{/* always keep the app awake in development mode. */}
			{process.env.NODE_ENV === "development" && <KeepAwake />}
		</AppProvider>
	);
}
