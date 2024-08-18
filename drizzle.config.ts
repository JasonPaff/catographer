import type { Config } from "drizzle-kit";

export default {
	dialect: "sqlite",
	driver: "expo",
	out: "./database/migrations",
	schema: ["./database/schemas/cat-schema.ts"],
	strict: true,
	verbose: true,
} satisfies Config;
