import { type FieldValues, FormProvider, type UseFormReturn } from "react-hook-form";
import { Form as UiForm } from "tamagui";

interface FormProviderProps<T extends FieldValues> {
	context: UseFormReturn<T>;
}

export function Form<T extends FieldValues>({ children, context }: RequiredChildren<FormProviderProps<T>>) {
	return (
		<FormProvider {...context}>
			<UiForm>{children}</UiForm>
		</FormProvider>
	);
}
