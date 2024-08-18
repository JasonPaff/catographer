import { useCallback, useState } from "react";

export const useBoolean = (initialValue = false) => {
	const [state, setState] = useState(initialValue);

	const on = useCallback(() => setState(true), []);
	const off = useCallback(() => setState(false), []);
	const toggle = useCallback(() => setState((prev) => !prev), []);

	return [state, { off, on, toggle }] as const;
};
