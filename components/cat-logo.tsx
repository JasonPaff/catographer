import { Image, type ImageProps } from "tamagui";

export function CatLogo(props: Omit<ImageProps, "source" | "objectFit">) {
	return (
		<Image
			height={"$2.5"}
			objectFit={"contain"}
			width={"$2.5"}
			{...props}
			source={{ uri: require("../assets/images/catographer-logo.png") }}
		/>
	);
}
