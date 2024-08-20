module.exports = (api) => {
	api.cache(true);
	return {
		presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
		plugins: [
			["inline-import", { extensions: [".sql"] }],
			// NOTE: this is only necessary if you are using reanimated for animations
			"react-native-reanimated/plugin",
		],
	};
};
