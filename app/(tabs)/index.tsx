import { StyleSheet, View } from "react-native";
import { AddCat } from "../../components/cats-screen/add-cat";
import { CatList } from "../../components/cats-screen/cat-list";

export default function Cats() {
	return (
		<View style={styles.container}>
			<AddCat />
			<CatList />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
	},
});
