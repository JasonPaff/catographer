import { render, screen } from "@testing-library/react-native";
import { About } from "./about";

test("<About/> should render correctly", () => {
	render(<About />).toJSON();
	expect(screen).toMatchSnapshot();
});
