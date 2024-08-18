import { config as configBase, tokens } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";
import * as themes from "./theme-output";

export const config = createTamagui({ ...configBase, themes, tokens });

export default config;

export type Conf = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
