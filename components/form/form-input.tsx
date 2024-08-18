import { type FieldPath, type FieldValues, type RegisterOptions, useFormContext } from "react-hook-form";
import { Input, type InputProps } from "tamagui";

type FormInputProps<T extends FieldValues> = Omit<InputProps, "name" | "onBlur" | "onChangeText" | "value"> & {
	name: FieldPath<T>;
	registerOptions?: RegisterOptions<T>;
};

export function FormInput<T extends FieldValues>({ name, registerOptions, ...props }: FormInputProps<T>) {
	const { register } = useFormContext<T>();

	return <Input {...props} {...register(name, registerOptions)} id={name} />;
}
