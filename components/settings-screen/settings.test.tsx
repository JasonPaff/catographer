import { render, screen } from "@testing-library/react-native";
import { Settings } from "./settings";

test("<Settings/> should render correctly", () => {
	render(<Settings />).toJSON();
	expect(screen).toMatchSnapshot();
});
