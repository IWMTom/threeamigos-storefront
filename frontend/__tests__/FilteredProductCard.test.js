import FilteredProductCard from "../components/FilteredProductCard";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const mockedProduct = {
	id: "abcdefghijklmnopqrst",
	slug: "abc-def",
	sale: true,
	name: "Abc Def",
	image_url: "http://placehold.it/100x100",
	price: "199",
	category: {
		icon: "ic_bookmark",
		name: "Screen Protectors"
	},
	brand: {
		name: "iStuff-R-Us"
	}
};

describe("<FilteredProductCard />", () => {
	it("renders and matches the snapshot", () => {
		const wrapper = shallow(
			<FilteredProductCard product={mockedProduct} />
		);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
