import { Image, type ImageStyle, StyleSheet } from "react-native";
import { TEST_IDS } from "../../../constants/test-ids";

export function CatLogo(style?: ImageStyle) {
	const catImage = require("../../../assets/images/catographer-logo.png");
	return (
		<Image
			alt={"catographer logo"}
			source={catImage}
			style={{ ...styles.image, ...style }}
			testID={TEST_IDS.catLogoImage}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 35,
		objectFit: "contain",
		width: 35,
	},
});
