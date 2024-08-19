import { useTheme } from "@react-navigation/native";
import { Plus } from "@tamagui/lucide-icons";
import { Adapt, Button, Dialog, Form, Separator, Sheet, XStack } from "tamagui";
import { type CatSchema, catsTable, createCatSchema } from "../../database/schemas/cat-schema";
import { useBoolean } from "../../hooks/use-boolean";
import { useDatabase } from "../../hooks/use-database";
import { useForm } from "../../hooks/use-form";
import { FormInput } from "../input/form-input";

export function AddCat() {
	const [isDialogOpen, setIsDialogOpen] = useBoolean();

	const { dark } = useTheme();
	const db = useDatabase();

	const form = useForm<CatSchema>({
		defaultValues: {
			name: "",
			age: null,
		},
		onSubmit: (formData) => {
			console.log(formData.value);
			db.insert(catsTable).values(formData.value);
		},
	});

	return (
		<Dialog modal onOpenChange={setIsDialogOpen.force} open={isDialogOpen}>
			<Dialog.Trigger asChild>
				<Button alignSelf={"center"} icon={<Plus size={25} />} onPress={setIsDialogOpen.on} size={"$2.5"} />
			</Dialog.Trigger>

			{/* display a sheet when on mobile devices */}
			<Adapt platform={"touch"} when={"sm"}>
				<Sheet animation={"medium"} dismissOnSnapToBottom modal zIndex={200000}>
					<Sheet.Frame backgroundColor={dark ? "$gray6Dark" : "$gray6light"} padding={"$4"} gap={"$1"}>
						<Adapt.Contents />
					</Sheet.Frame>
					<Sheet.Overlay animation={"lazy"} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
				</Sheet>
			</Adapt>

			{/* display a dialog when on non-mobile devices */}
			<Dialog.Portal>
				<Dialog.Overlay
					animation={"slow"}
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
					opacity={0.5}
					key={"overlay"}
				/>

				<Dialog.Content
					animateOnly={["transform", "opacity"]}
					animation={[
						"quicker",
						{
							opacity: {
								overshootClamping: true,
							},
						},
					]}
					enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
					exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
					key={"content"}
				>
					<Dialog.Title>Add Cat</Dialog.Title>
					<Separator
						borderColor={dark ? "$gray8Dark" : "$gray8light"}
						borderWidth={"$1"}
						marginVertical={"$1"}
					/>

					<Form marginTop={"$2"}>
						<form.Field
							name={"name"}
							validators={{
								onChange: createCatSchema.shape.name,
							}}
						>
							{(field) => (
								<FormInput
									errorMessage={field.state.meta.errors.join("").split(",")?.[0]}
									focusOnMount
									labelText={"Name"}
									placeholder={"Enter the cats name"}
									size={"$4"}
									value={field.state.value}
									{...field}
								/>
							)}
						</form.Field>

						<form.Field
							name={"age"}
							validators={{
								onChange: createCatSchema.shape.age,
							}}
						>
							{(field) => (
								<FormInput
									errorMessage={field.state.meta.errors.join("").split(",")?.[0]}
									keyboardType={"numeric"}
									labelText={"Age"}
									name={field.name}
									handleBlur={field.handleBlur}
									handleChange={(text) => field.handleChange(Number(text))}
									placeholder={"Enter the cats name"}
									size={"$4"}
									value={String(field.state.value ?? "")}
								/>
							)}
						</form.Field>

						<XStack alignSelf={"flex-end"} gap={"$2"} marginTop={"$2"}>
							<Button aria-label={"Cancel"} chromeless onPress={setIsDialogOpen.off}>
								Cancel
							</Button>

							<Form.Trigger asChild>
								<Button aria-label={"Save"} onPress={form.handleSubmit}>
									Save
								</Button>
							</Form.Trigger>
						</XStack>
					</Form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}
