import type { Config } from "drizzle-kit";

export default {
	dialect: "sqlite",
	driver: "expo",
	out: "./database/migrations",
	schema: ["./database/schemas/cat.ts", "./database/schemas/cat-nickname.ts"],
	strict: true,
	verbose: true,
} satisfies Config;
