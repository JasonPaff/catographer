import { Text } from "react-native";
import { VStack } from "../shared/stack";

export function CatList() {
	//const [cats, setCats] = useState<SelectCats>([]);

	// const db = useDatabase();
	//
	// useEffect(() => {
	// 	(async () => {
	// 		const cats = await db.select().from(catTable);
	// 		setCats(cats);
	// 	})();
	// }, [db]);

	return (
		<VStack>
			<Text>Cat List</Text>
			{/*{cats?.map((cat) => (*/}
			{/*	<Text key={cat.catId}>*/}
			{/*		{cat.name} - {cat.dateOfBirth}*/}
			{/*	</Text>*/}
			{/*))}*/}
		</VStack>
	);
}
