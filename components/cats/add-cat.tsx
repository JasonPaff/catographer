import { useTheme } from "@react-navigation/native";
import { Plus } from "@tamagui/lucide-icons";
import { Adapt, Button, Dialog, Fieldset, Label, Sheet, XStack } from "tamagui";
import { type CatSchema, catsTable, createCatSchema } from "../../database/schemas/cat-schema";
import { useDatabase } from "../../hooks/use-database";
import { useForm } from "../../hooks/use-form";
import { Form } from "../../providers/form-provider";
import { FormInput } from "../form/form-input";

export function AddCat() {
	const { dark } = useTheme();

	const form = useForm<CatSchema>(createCatSchema);
	const db = useDatabase();

	const onAddCat = ({ age, name }: CatSchema) => {
		console.log("name", name);
		console.log("age", age);
		db.insert(catsTable).values({ name, age });
	};

	console.log(form.formState.errors);

	return (
		<Dialog modal>
			<Dialog.Trigger asChild>
				<Button alignSelf={"center"} icon={<Plus size={25} />} size={"$2.5"} />
			</Dialog.Trigger>

			<Adapt platform={"touch"} when={"sm"}>
				<Sheet animation={"medium"} dismissOnSnapToBottom modal zIndex={200000}>
					<Sheet.Frame backgroundColor={dark ? "$gray6Dark" : "$gray6light"} padding={"$4"} gap={"$1"}>
						<Adapt.Contents />
					</Sheet.Frame>
					<Sheet.Overlay animation={"lazy"} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
				</Sheet>
			</Adapt>

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
					<Dialog.Description>Add a new cate here. Click save when you're done.</Dialog.Description>

					<Form context={form}>
						<Fieldset gap={"$2.5"} horizontal marginTop={"$4"}>
							<Label htmlFor={"name"} justifyContent={"flex-end"}>
								Name
							</Label>
							<FormInput flex={1} id={"name"} name={"name"} size={"$3"} />
						</Fieldset>

						<Fieldset gap={"$5"} horizontal>
							<Label htmlFor={"age"} justifyContent={"flex-end"}>
								Age
							</Label>

							<FormInput flex={1} id={"age"} name={"age"} size={"$3"} />
						</Fieldset>

						<XStack alignSelf={"flex-end"} gap={"$4"} marginTop={"$2"}>
							<Dialog.Close asChild displayWhenAdapted>
								<Button aria-label={"Save"} onPress={form.handleSubmit(onAddCat)}>
									Save
								</Button>
							</Dialog.Close>
						</XStack>
					</Form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}
