import { getFontSized } from "@tamagui/get-font-sized";
import { getSpace } from "@tamagui/get-token";
import type { SizeVariantSpreadFunction } from "@tamagui/web";
import type { ColorProp, ColorTokens, FontSizeTokens } from "tamagui";
import {
	Label,
	Button as TButton,
	Input as TInput,
	Text,
	View,
	XGroup,
	createStyledContext,
	getFontSize,
	getVariable,
	isWeb,
	styled,
	useGetThemedIcon,
	useTheme,
	withStaticProperties,
} from "tamagui";
import { useBoolean } from "../../hooks/use-boolean";

const defaultContextValues = {
	color: undefined,
	scaleIcon: 1.2,
	size: "$true",
} as const;

export const InputContext = createStyledContext<{
	size: FontSizeTokens;
	scaleIcon: number;
	color?: ColorTokens | string;
}>(defaultContextValues);

export const defaultInputGroupStyles = {
	backgroundColor: "$color2",
	borderColor: "$borderColor",
	borderWidth: 1,
	color: "$color",
	focusStyle: {
		outlineColor: "$outlineColor",
		outlineWidth: 2,
		outlineStyle: "solid",
		borderColor: "$borderColorFocus",
	},
	...(isWeb
		? {
				tabIndex: 0,
			}
		: {
				focusable: true,
			}),
	fontFamily: "$body",
	hoverStyle: {
		borderColor: "$borderColorHover",
	},
	// this fixes a flex bug where it overflows container
	minWidth: 0,
	outlineWidth: 0,
	size: "$true",
} as const;

const InputGroupFrame = styled(XGroup, {
	context: InputContext,
	defaultVariants: {
		// @ts-ignore
		unstyled: process.env.TAMAGUI_HEADLESS === "1",
	},
	justifyContent: "space-between",
	variants: {
		applyFocusStyle: {
			":boolean": (val, { props }) => {
				if (val) {
					return props.focusStyle || defaultInputGroupStyles.focusStyle;
				}
			},
		},
		scaleIcon: {
			":number": {} as any,
		},
		size: {
			"...size": (val, { tokens }) => {
				return {
					// @ts-ignore
					borderRadius: tokens.radius[val],
				};
			},
		},
		unstyled: {
			false: defaultInputGroupStyles,
		},
	} as const,
});

const FocusContext = createStyledContext({
	focused: false,
	// @ts-ignore
	setFocused: (val: boolean) => {},
});

const InputGroupImpl = InputGroupFrame.styleable((props, forwardedRef) => {
	const { children, ...rest } = props;
	const [focused, setFocused] = useBoolean();

	return (
		<FocusContext.Provider focused={focused} setFocused={setFocused.force}>
			<InputGroupFrame applyFocusStyle={focused} ref={forwardedRef} {...rest}>
				{children}
			</InputGroupFrame>
		</FocusContext.Provider>
	);
});

export const inputSizeVariant: SizeVariantSpreadFunction<any> = (val = "$true", extras) => {
	// @ts-ignore
	const radiusToken = extras.tokens.radius[val] ?? extras.tokens.radius["$true"];
	const paddingHorizontal = getSpace(val, {
		shift: -1,
		bounds: [2],
	});
	const fontStyle = getFontSized(val as any, extras);
	// lineHeight messes up input on native
	if (!isWeb && fontStyle) delete fontStyle["lineHeight"];

	return {
		...fontStyle,
		borderRadius: extras.props.circular ? 100_000 : radiusToken,
		height: val,
		paddingHorizontal,
	};
};

const InputFrame = styled(TInput, {
	context: InputContext,
	unstyled: true,
});

const InputImpl = InputFrame.styleable((props, ref) => {
	const { setFocused } = FocusContext.useStyledContext();
	const { size } = InputContext.useStyledContext();
	const { ...rest } = props;

	return (
		<View flex={1}>
			<InputFrame
				onBlur={() => setFocused(false)}
				onFocus={() => {
					setFocused(true);
				}}
				ref={ref}
				size={size}
				{...rest}
			/>
		</View>
	);
});

const InputSection = styled(XGroup.Item, {
	alignItems: "center",
	context: InputContext,
	justifyContent: "center",
});

const Button = styled(TButton, {
	alignItems: "center",
	context: InputContext,
	justifyContent: "center",
	variants: {
		size: {
			"...size": (val = "$true", { tokens }) => {
				if (typeof val === "number") {
					return {
						borderRadius: val * 0.2,
						height: val,
						paddingHorizontal: 0,
					};
				}
				return {
					// @ts-ignore
					borderRadius: tokens.radius[val],
					height: val,
					paddingHorizontal: 0,
				};
			},
		},
	} as const,
});

export const InputIconFrame = styled(View, {
	alignItems: "center",
	context: InputContext,
	justifyContent: "center",
	variants: {
		size: {
			"...size": (val, { tokens }) => {
				return {
					// @ts-ignore
					paddingHorizontal: tokens.space[val],
				};
			},
		},
	} as const,
});

const getIconSize = (size: FontSizeTokens, scale: number) => {
	return (typeof size === "number" ? size * 0.5 : getFontSize(size as FontSizeTokens)) * scale;
};

const InputIcon = InputIconFrame.styleable<{
	color?: ColorTokens | string;
	scaleIcon?: number;
}>((props, ref) => {
	const { children, color: colorProp, ...rest } = props;
	const inputContext = InputContext.useStyledContext();
	const { size = "$true", color: contextColor, scaleIcon = 1 } = inputContext;

	const theme = useTheme();
	const color = getVariable(contextColor || theme[contextColor as any]?.get("web") || theme.color10?.get("web"));
	const iconSize = getIconSize(size as FontSizeTokens, scaleIcon);

	const getThemedIcon = useGetThemedIcon({ size: iconSize, color: color as ColorProp });

	return (
		<InputIconFrame ref={ref} {...rest}>
			{getThemedIcon(children)}
		</InputIconFrame>
	);
});

export const InputContainerFrame = styled(View, {
	context: InputContext,
	flexDirection: "column",

	variants: {
		size: {
			"...size": (val, { tokens }) => ({
				// @ts-ignore
				gap: tokens.space[val].val * 0.3,
			}),
		},
		color: {
			"...color": () => ({}),
		},
		gapScale: {
			":number": {} as any,
		},
	} as const,

	defaultVariants: {
		size: "$4",
	},
});

export const InputLabel = styled(Label, {
	context: InputContext,
	variants: {
		size: {
			"...fontSize": getFontSized as any,
		},
	} as const,
});

export const InputInfo = styled(Text, {
	context: InputContext,
	color: "$color10",

	variants: {
		size: {
			"...fontSize": (val, { font }) => {
				if (!font) return;
				const fontSize = font.size[val].val * 0.8;
				const lineHeight = font.lineHeight?.[val].val * 0.8;
				const fontWeight = font.weight?.$2;
				const letterSpacing = font.letterSpacing?.[val];
				const textTransform = font.transform?.[val];
				const fontStyle = font.style?.[val];
				return {
					fontSize,
					lineHeight,
					fontWeight,
					letterSpacing,
					textTransform,
					fontStyle,
				};
			},
		},
	} as const,
});

const InputXGroup = styled(XGroup, {
	context: InputContext,

	variants: {
		size: {
			"...size": (val, { tokens }) => {
				// @ts-ignore
				const radiusToken = tokens.radius[val] ?? tokens.radius.$true;
				return {
					borderRadius: radiusToken,
				};
			},
		},
	} as const,
});

export const Input = withStaticProperties(InputContainerFrame, {
	Box: InputGroupImpl,
	Area: InputImpl,
	Section: InputSection,
	Button,
	Icon: InputIcon,
	Info: InputInfo,
	Label: InputLabel,
	XGroup: withStaticProperties(InputXGroup, { Item: XGroup.Item }),
});
