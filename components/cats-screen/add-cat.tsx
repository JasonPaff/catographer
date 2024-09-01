import { Plus } from "lucide-react-native";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { type CreateCat, catTable, createCatSchema } from "../../database/schemas/cat";
import { useBoolean } from "../../hooks/use-boolean/use-boolean";
import { useDatabase } from "../../hooks/use-database";
import { useForm } from "../../hooks/use-form";

export function AddCat() {
	const [isAddCatModalOpen, setIsAddCatModalOpen] = useBoolean();

	const db = useDatabase();

	const form = useForm<CreateCat>({
		defaultValues: {
			name: "",
			dateOfBirth: null,
		},
		onSubmit: (formData) => {
			console.log(formData.value);
			db.insert(catTable).values(formData.value);
		},
	});

	return (
		<View className={"items-center flex-1 justify-center"}>
			<Pressable className={"bg-red-300 text-white p-4 inline-flex flex-row"} onPress={setIsAddCatModalOpen.on}>
				<Text>Add Cat</Text>
				<Plus color={"white"} size={25} />
			</Pressable>

			<Modal
				animationType={"slide"}
				onRequestClose={setIsAddCatModalOpen.off}
				transparent={true}
				visible={isAddCatModalOpen}
			>
				<form.Field
					name={"name"}
					validators={{
						onChange: createCatSchema.shape.name,
					}}
				>
					{(field) => (
						<TextInput
							onChangeText={field.handleChange}
							placeholder={"Enter your cats name"}
							value={field.state.value}
						/>
					)}
				</form.Field>

				<Pressable className={"bg-red-300 p-4"} onPress={setIsAddCatModalOpen.off}>
					<Text>Close</Text>
				</Pressable>
			</Modal>
		</View>
	);
}
