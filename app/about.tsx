import { H1, H6, View } from "tamagui";
import { CatLogo } from "../components/cat-logo";

export default function About() {
	return (
		<View alignItems={"center"} flex={1} marginTop={"$10"}>
			<H1 fontWeight={"bold"}>Catographer</H1>
			<H6 textTransform={"none"}>Developed By: Jason Paff</H6>
			<CatLogo height={"75%"} marginLeft={"$6"} marginTop={"$-6"} width={"75%"} />
		</View>
	);
}
