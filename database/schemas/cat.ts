import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const catsTable = sqliteTable("cats", {
	id: integer("id").primaryKey().notNull(),
	name: text("note", { length: 50 }).notNull(),
	dateOfBirth: text("date_of_birth"),
});

export const selectCatSchema = createSelectSchema(catsTable);
export const createCatSchema = createInsertSchema(catsTable).omit({
	id: true,
});

export type CreateCat = z.infer<typeof createCatSchema>;
export type SelectCat = z.infer<typeof selectCatSchema>;
export type SelectCats = SelectCat[];
