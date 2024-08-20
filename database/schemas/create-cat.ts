import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const catsTable = sqliteTable("cats", {
	id: integer("id").primaryKey(),
	name: text("note", { length: 100 }).notNull(),
	age: integer("amount"),
});

export const insertCatSchema = createInsertSchema(catsTable, {
	age: z
		.number()
		.int({ message: "Age must be a whole number." })
		.min(0, { message: "Age must be a positive number." })
		.nullish(),
	name: z
		.string()
		.min(1, { message: "Name is required." })
		.min(3, { message: "Name must be at least 3 characters." })
		.max(100, { message: "Name cannot be more than 100 characters." }),
});

export const createCatSchema = insertCatSchema.omit({
	id: true,
});

export type CreateCat = z.infer<typeof createCatSchema>;
export type SelectCat = typeof catsTable.$inferSelect;
export type SelectCats = SelectCat[];
