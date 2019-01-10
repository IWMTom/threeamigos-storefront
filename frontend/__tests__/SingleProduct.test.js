import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import SingleProduct, {
	SINGLE_PRODUCT_QUERY
} from "../components/SingleProduct";
import { MockedProvider } from "react-apollo/test-utils";
import { mockedProduct } from "../lib/testUtils";

describe("<SingleProduct />", () => {
	it("renders with correct data", async () => {
		const mocks = [
			{
				request: {
					query: SINGLE_PRODUCT_QUERY,
					variables: { slug: "abc", first: 1 }
				},
				result: {
					data: {
						products: [mockedProduct()]
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={false}>
				<SingleProduct slug="abc" />
			</MockedProvider>
		);

		expect(wrapper.text()).toContain("Loading...");
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find("div#product-card"))).toMatchSnapshot();
	});

	it("errors when product isn't found", async () => {
		const mocks = [
			{
				request: {
					query: SINGLE_PRODUCT_QUERY,
					variables: { slug: "abc", first: 1 }
				},
				result: {
					errors: [{ message: "Product Not Found!" }]
				}
			}
		];

		const wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={false}>
				<SingleProduct slug="abc" />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		const error = wrapper.find('[data-test="graphql-error"]');
		expect(toJSON(error)).toMatchSnapshot();
	});
});
