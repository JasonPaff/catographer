import { act, renderHook } from "@testing-library/react-native";
import { useBoolean } from "./use-boolean";

describe("initial value", () => {
	it("should be false when no initial value is provided", () => {
		const { result } = renderHook(() => useBoolean());
		expect(result.current[0]).toBe(false);
	});

	it("should be false when a false initial value is provided", () => {
		const { result } = renderHook(() => useBoolean(false));
		expect(result.current[0]).toBe(false);
	});

	it("should be true when a true initial value is provided", () => {
		const { result } = renderHook(() => useBoolean(true));
		expect(result.current[0]).toBe(true);
	});
});

describe("force function", () => {
	it("should be a function", () => {
		const { result } = renderHook(() => useBoolean());
		expect(typeof result.current[1].force).toBe("function");
	});

	it("should set the initial true value to false when invoked with false", () => {
		const { result } = renderHook(() => useBoolean(true));
		act(() => result.current[1].force(false));
		expect(result.current[0]).toBe(false);
	});

	it("should set the initial false value to true when invoked with true", () => {
		const { result } = renderHook(() => useBoolean(false));
		act(() => result.current[1].force(true));
		expect(result.current[0]).toBe(true);
	});
});

describe("off function", () => {
	it("should be a function", () => {
		const { result } = renderHook(() => useBoolean());
		expect(typeof result.current[1].off).toBe("function");
	});

	it("should set the value to false invoked called", () => {
		const { result } = renderHook(() => useBoolean(true));
		act(() => result.current[1].off());
		expect(result.current[0]).toBe(false);
	});
});

describe("on function", () => {
	it("should be a function", () => {
		const { result } = renderHook(() => useBoolean());
		expect(typeof result.current[1].on).toBe("function");
	});

	it("should set the value to true invoked called", () => {
		const { result } = renderHook(() => useBoolean(false));
		act(() => result.current[1].on());
		expect(result.current[0]).toBe(true);
	});
});

describe("toggle function", () => {
	it("should be a function", () => {
		const { result } = renderHook(() => useBoolean());
		expect(typeof result.current[1].toggle).toBe("function");
	});

	it("should toggle the value when invoked", () => {
		const { result } = renderHook(() => useBoolean(false));

		// toggle to true
		act(() => result.current[1].toggle());
		expect(result.current[0]).toBe(true);

		// toggle back to false
		act(() => result.current[1].toggle());
		expect(result.current[0]).toBe(false);
	});
});
