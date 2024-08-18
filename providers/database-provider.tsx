import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync } from "expo-sqlite";
import { databaseContext } from "hooks/use-database";
import { Text, View } from "tamagui";
import { databaseName } from "../constants/database";
import migrations from "../database/migrations/migrations";

const expoDb = openDatabaseSync(databaseName);
const db = drizzle(expoDb);

export default function DatabaseProvider({ children }: RequiredChildren) {
	const { success, error } = useMigrations(db, migrations);

	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}

	if (!success) {
		return (
			<View>
				<Text>Database migration is in progress...</Text>
			</View>
		);
	}

	return <databaseContext.Provider value={db}>{children}</databaseContext.Provider>;
}
