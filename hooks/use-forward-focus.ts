import { type RefObject, useEffect } from "react";
import type { TamaguiElement } from "tamagui";
import { useBoolean } from "./use-boolean";

/**
 * focus the target element when the trigger element is focused
 * */
export const useForwardFocus = (target: RefObject<TamaguiElement>) => {
	const [focused, setFocused] = useBoolean(false);

	useEffect(() => {
		if (focused && target.current) {
			target.current.focus();
		}
	}, [focused, target.current]);

	return {
		focusable: true,
		onFocus: setFocused.on,
		onBlur: setFocused.off,
	};
};
