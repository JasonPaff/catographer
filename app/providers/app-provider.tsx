import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import config from "../../tamagui.config";
import ThemeProvider from "./theme-provider";
import ToastProvider from "./toast-provider";

export default function AppProvider({ children, ...props }: Omit<TamaguiProviderProps, "config">) {
	const colorScheme = useColorScheme();

	const defaultTheme = useMemo(() => (colorScheme === "dark" ? "dark" : "light"), [colorScheme]);

	return (
		<TamaguiProvider config={config} defaultTheme={defaultTheme} {...props}>
			<ThemeProvider>
				<ToastProvider>{children}</ToastProvider>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
