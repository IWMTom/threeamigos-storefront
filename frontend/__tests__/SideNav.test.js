import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import SideNav, { ALL_CATEGORIES_QUERY } from "../components/SideNav";
import SideNavCategory from "../components/SideNavCategory";
import { MockedProvider } from "react-apollo/test-utils";

const mockedCategory = [
	{
		id: "abcdefghijklmnopqrst",
		slug: "istuff-r-us",
		name: "iStuff-R-Us",
		image_url: "http://placehold.it/300x100",
		icon: "ic_bookmark",
		products: [
			{
				id: "fgjfdgdf",
				brand: {
					id: "fghufdsg",
					slug: "dfsgdfhjg",
					name: "oighd"
				}
			}
		]
	}
];

describe("<SideNav />", () => {
	it("renders and generates SideNavCategory", async () => {
		const mocks = [
			{
				request: {
					query: ALL_CATEGORIES_QUERY,
					variables: { first: 5 }
				},
				result: {
					data: {
						categories: mockedCategory
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks} addTypename={false}>
				<SideNav />
			</MockedProvider>
		);

		expect(wrapper.find('[data-test="loading"]').text()).toContain(
			"Loading..."
		);
		await wait();
		wrapper.update();
		expect(wrapper.contains(SideNavCategory)).toBe(true);
	});
});
