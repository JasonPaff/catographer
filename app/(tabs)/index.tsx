import { Plus } from "@tamagui/lucide-icons";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import { Button, Text, View, YStack } from "tamagui";
import { AddCat } from "../../components/cats-screen/add-cat";
import { catsTable } from "../../database/schemas/cat-schema";
import { useDatabase } from "../../hooks/use-database";

type Cats = typeof catsTable.$inferSelect;

export default function Cats() {
	const [cats, setCats] = useState<Cats[]>([]);

	const db = useDatabase();

	const onAddCat = useCallback(() => {
		(async () => {
			const newCat = await db
				.insert(catsTable)
				.values({ name: "Taco", age: 4 })
				.returning()
				.then((res) => res[0]);
			if (!newCat) return;

			setCats((prev) => {
				return [...prev, newCat];
			});
		})();
	}, [db]);

	const onRemoveCat = useCallback(() => {
		(async () => {
			await db.delete(catsTable).where(eq(catsTable.name, "Taco"));
			setCats([]);
		})();
	}, [db]);

	useEffect(() => {
		(async () => {
			const cats = await db.select().from(catsTable);
			setCats(cats);
		})();
	}, [db]);

	return (
		<View alignItems={"center"} flex={1}>
			<YStack gap={"$2"} marginTop={"$6"}>
				<AddCat />
				<Button alignSelf={"center"} icon={<Plus size={25} />} onPress={onAddCat} size={"$2.5"} />
				<Button onPress={onRemoveCat}>Remove All Taco Cats</Button>
			</YStack>

			<YStack>
				{cats?.map((cat) => (
					<Text key={cat.id}>
						{cat.name} - {cat.age}
					</Text>
				))}
			</YStack>
		</View>
	);
}
