import DatabaseProvider from "./database-provider";
import ThemeProvider from "./theme-provider";

export function AppProvider({ children }: RequiredChildren) {
	return (
		<ThemeProvider>
			<DatabaseProvider>{children}</DatabaseProvider>
		</ThemeProvider>
	);
}
