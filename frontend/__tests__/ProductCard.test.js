import ProductCard from "../components/ProductCard";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const mockedProduct = {
	id: "abcdefghijklmnopqrst",
	slug: "abc-def",
	sale: true,
	name: "Abc Def",
	image_url: "http://placehold.it/100x100",
	price: "199"
};

describe("<ProductCard />", () => {
	it("renders and matches the snapshot", () => {
		const wrapper = shallow(<ProductCard product={mockedProduct} />);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	// it("renders and displays correctly", () => {
	// 	const wrapper = shallow(<ProductCard product={mockedProduct} />);
	// 	const image = wrapper.find("img");
	// 	const name = wrapper.find("span#name");
	// 	const price = wrapper.find("h3#price");

	// 	expect(image.props().src).toBe(mockedProduct.image_url);
	// 	expect(name.text()).toBe(mockedProduct.name);
	// 	expect(price.text()).toBe("£1.99");
	// 	expect(wrapper.find("span.product-sale").exists()).toBe(true);
	// });
});
