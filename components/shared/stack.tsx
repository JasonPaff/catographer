import { View, type ViewStyle } from "react-native";

export function HStack({ children, ...style }: RequiredChildren<ViewStyle>) {
	return (
		<View flex={1} flexDirection={"row"} {...style}>
			{children}
		</View>
	);
}

export function VStack({ children, ...style }: RequiredChildren<ViewStyle>) {
	return (
		<View flex={1} flexDirection={"column"} {...style}>
			{children}
		</View>
	);
}
