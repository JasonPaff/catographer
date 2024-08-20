import { useState } from "react";

export type UseBoolean = (initialValue?: boolean) => readonly [
	boolean,
	{
		force: (value: boolean) => void;
		off: () => void;
		on: () => void;
		toggle: () => void;
	},
];

export const useBoolean: UseBoolean = (initialValue = false) => {
	const [state, setState] = useState(initialValue);

	return [
		state,
		{
			force: (value) => setState(value),
			off: () => setState(false),
			on: () => setState(true),
			toggle: () => setState((prev) => !prev),
		},
	];
};
