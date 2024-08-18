import { DarkTheme, DefaultTheme, ThemeProvider as Provider } from "@react-navigation/native";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

export default function ThemeProvider({ children }: RequiredChildren) {
	const colorScheme = useColorScheme();

	const value = useMemo(() => (colorScheme === "dark" ? DarkTheme : DefaultTheme), [colorScheme]);

	return <Provider value={value}>{children}</Provider>;
}
