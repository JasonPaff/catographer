import { useCallback, useState } from "react";

export const useBoolean = (initialValue = false) => {
	const [state, setState] = useState(initialValue);

	const force = useCallback((value: boolean) => setState(value), []);
	const off = useCallback(() => setState(false), []);
	const on = useCallback(() => setState(true), []);
	const toggle = useCallback(() => setState((prev) => !prev), []);

	return [state, { force, off, on, toggle }] as const;
};
