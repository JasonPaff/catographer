import { SQLiteProvider } from "expo-sqlite";
import { databaseName } from "../constants/database";

export default function DatabaseProvider({ children }: RequiredChildren) {
	return <SQLiteProvider databaseName={databaseName}>{children}</SQLiteProvider>;
}
