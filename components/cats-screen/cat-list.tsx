import { useEffect, useState } from "react";
import { Text } from "react-native";
import { type SelectCats, catsTable } from "../../database/schemas/create-cat";
import { useDatabase } from "../../hooks/use-database";
import { VStack } from "../shared/stack";

export function CatList() {
	const [cats, setCats] = useState<SelectCats>([]);

	const db = useDatabase();

	useEffect(() => {
		(async () => {
			const cats = await db.select().from(catsTable);
			setCats(cats);
		})();
	}, [db]);

	return (
		<VStack>
			{cats?.map((cat) => (
				<Text key={cat.id}>
					{cat.name} - {cat.age}
				</Text>
			))}
		</VStack>
	);
}
