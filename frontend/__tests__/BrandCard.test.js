import BrandCard from "../components/BrandCard";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const mockedBrand = {
	id: "abcdefghijklmnopqrst",
	slug: "istuff-r-us",
	name: "iStuff-R-Us",
	image_url: "http://placehold.it/300x100"
};

describe("<BrandCard />", () => {
	it("renders and matches the snapshot", () => {
		const wrapper = shallow(<BrandCard brand={mockedBrand} />);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
