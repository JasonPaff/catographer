import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { createContext, useContext } from "react";

export const databaseContext = createContext<ExpoSQLiteDatabase | null>(null);

export function useDatabase() {
	const context = useContext(databaseContext);
	if (!context) throw new Error("useDatabase must be used within a DatabaseProvider");
	return context;
}
