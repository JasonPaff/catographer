import { useTheme } from "@react-navigation/native";
import { Info } from "@tamagui/lucide-icons";
import { AnimatePresence, type InputProps, type SizeTokens, View } from "tamagui";
import { Input } from "./input-parts";

interface FormInputProps extends InputProps {
	errorMessage?: string;
	focusOnMount?: boolean;
	handleBlur: () => void;
	handleChange: (value: string) => void;
	labelText?: string;
	name: string;
	placeholder?: string;
	size?: SizeTokens;
	value: string;
}

export function FormInput({
	errorMessage = "",
	focusOnMount = false,
	labelText = "Label",
	name,
	handleBlur,
	handleChange,
	placeholder,
	size = "$4",
	value,
	...inputProps
}: FormInputProps) {
	const { dark } = useTheme();

	return (
		<View alignItems={"center"} flexDirection={"column"} justifyContent={"center"}>
			<Input minWidth={"100%"} onBlur={handleBlur} size={size}>
				{/* label */}
				<Input.Label htmlFor={"input"} marginBottom={"$1.5"}>
					{labelText}
				</Input.Label>

				{/* input field */}
				<Input.Box
					borderColor={errorMessage ? (dark ? "$red9Dark" : "$red9Light") : undefined}
					focusStyle={{
						borderColor: errorMessage ? (dark ? "$red9Dark" : "$red9Light") : undefined,
					}}
				>
					<Input.Area
						{...inputProps}
						autoFocus={focusOnMount}
						color={"$white3"}
						id={name}
						onChangeText={handleChange}
						placeholder={placeholder}
						value={value}
					/>
				</Input.Box>

				{/* error message */}
				<AnimatePresence>
					{!!errorMessage && (
						<View
							animation={"bouncy"}
							enterStyle={{
								opacity: 0,
								scaleY: 0.5,
								y: -10,
							}}
							exitStyle={{
								opacity: 0,
								scaleY: 0.5,
								y: -10,
							}}
							flexDirection={"row"}
							gap={"$2"}
							marginLeft={"$1.5"}
							scaleY={1}
						>
							<Input.Icon padding={0}>
								<Info color={dark ? "$red9dark" : "$red9Light"} />
							</Input.Icon>
							<Input.Info color={dark ? "$red9Dark" : "$red9Light"}>
								{errorMessage.split(",")[0]}
							</Input.Info>
						</View>
					)}
				</AnimatePresence>
			</Input>
		</View>
	);
}
