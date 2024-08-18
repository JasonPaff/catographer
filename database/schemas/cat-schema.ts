import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const catsTable = sqliteTable("cats", {
	id: integer("id").primaryKey(),
	name: text("note").notNull(),
	age: integer("amount"),
});
