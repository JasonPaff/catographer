import { render, screen } from "@testing-library/react-native";
import { TEST_IDS } from "../../../constants/test-ids";
import { CatLogo } from "./cat-logo";

test("<CatLogo/> should render correctly", () => {
	render(<CatLogo />).toJSON();
	expect(screen).toMatchSnapshot();
});

test("<CatLogo/> should have alt attribute", () => {
	render(<CatLogo />);
	const image = screen.getByTestId(TEST_IDS.catLogoImage);
	expect(image).toHaveProperty("_fiber.memoizedProps.alt", "catographer logo");
});
