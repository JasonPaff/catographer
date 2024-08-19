import { type FormOptions, type Validator, useForm as useReactForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

type UseFormOptions<TFormData extends object> = Omit<
	FormOptions<TFormData, Validator<TFormData>>,
	"validatorAdapter" | "onSubmit"
> &
	Required<Pick<FormOptions<TFormData, Validator<TFormData>>, "onSubmit">>;

export function useForm<TFormData extends object>(options: UseFormOptions<TFormData>) {
	return useReactForm<TFormData, Validator<TFormData>>({
		...options,
		validatorAdapter: zodValidator(),
	});
}
