import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import PopularBrands, { ALL_BRANDS_QUERY } from "../components/PopularBrands";
import BrandCard from "../components/BrandCard";
import { MockedProvider } from "react-apollo/test-utils";

const mockedBrand = {
	id: "abcdefghijklmnopqrst",
	slug: "istuff-r-us",
	name: "iStuff-R-Us",
	image_url: "http://placehold.it/300x100"
};

describe("<PopularBrands />", () => {
	it("renders and matches the snapshot", async () => {
		const mocks = [
			{
				request: {
					query: ALL_BRANDS_QUERY,
					variables: { first: 4 }
				},
				result: {
					data: {
						brands: [mockedBrand]
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={false}>
				<PopularBrands />
			</MockedProvider>
		);

		expect(wrapper.find('[data-test="loading"]').text()).toContain(
			"Loading..."
		);
		await wait();
		wrapper.update();
		expect(
			wrapper.contains(
				<BrandCard key={mockedBrand.id} brand={mockedBrand} />
			)
		).toBe(true);
	});
});
