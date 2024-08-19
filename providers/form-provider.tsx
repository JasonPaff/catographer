import { Form as UiForm } from "tamagui";

type FormProviderProps = {
	name?: string;
};

export function Form({ children }: RequiredChildren<FormProviderProps>) {
	return <UiForm>{children}</UiForm>;
}
