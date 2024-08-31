import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const catTable = sqliteTable("cat", {
	catId: integer("id").primaryKey().notNull(),
	name: text("name", { length: 50 }).notNull(),
	dateOfBirth: text("date_of_birth"),
});

export const selectCatSchema = createSelectSchema(catTable);
export const createCatSchema = createInsertSchema(catTable, {
	name: z
		.string()
		.min(1, { message: "Name is required." })
		.max(50, { message: "Name cannot be more than 50 characters." }),
}).omit({
	catId: true,
});

export type CreateCat = z.infer<typeof createCatSchema>;
export type SelectCat = z.infer<typeof selectCatSchema>;
export type SelectCats = SelectCat[];
