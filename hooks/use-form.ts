import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, type UseFormProps, useForm as useHookForm } from "react-hook-form";
import type { AnyZodObject } from "zod";

export function useForm<T extends FieldValues>(schema: AnyZodObject, options?: Omit<UseFormProps<T>, "resolver">) {
	return useHookForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		...options,
		resolver: zodResolver(schema),
	});
}
