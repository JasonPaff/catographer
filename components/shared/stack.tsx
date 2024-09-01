import { View } from "react-native";
import { cn } from "../../utils/tailwind-utils";

export function HStack({ children, className }: RequiredChildrenClassName) {
	return <View className={cn("flex-1 flex-row", className)}>{children}</View>;
}

export function VStack({ children, className }: RequiredChildrenClassName) {
	return <View className={cn("flex-1 flex-col gap-5", className)}>{children}</View>;
}
