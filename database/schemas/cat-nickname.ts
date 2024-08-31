import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { catTable } from "./cat";

export const catNicknameTable = sqliteTable(
	"catNickname",
	{
		catNicknameId: integer("cat_nickname_id").primaryKey().notNull(),
		catId: integer("cat_id")
			.references(() => catTable.catId)
			.notNull(),
		nickname: text("nickname", { length: 50 }).notNull(),
	},
	(t) => ({
		unq: unique().on(t.catId, t.nickname),
	}),
);

export const selectCatNicknameSchema = createSelectSchema(catNicknameTable);
export const createCatNicknameSchema = createInsertSchema(catNicknameTable, {
	nickname: z
		.string()
		.min(1, { message: "Nickname is required." })
		.max(50, { message: "Nickname cannot be more than 50 characters." }),
}).omit({
	catNicknameId: true,
});

export type CreateCatNickname = z.infer<typeof createCatNicknameSchema>;
export type SelectCatNickname = z.infer<typeof selectCatNicknameSchema>;
export type SelectCatNicknames = SelectCatNickname[];
