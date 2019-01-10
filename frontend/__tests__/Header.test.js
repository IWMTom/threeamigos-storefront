import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { CURRENT_USER_QUERY } from "../components/User";
import Header from "../components/Header";
import { MockedProvider } from "react-apollo/test-utils";
import { mockedUser } from "../lib/testUtils";

describe("<Header />", () => {
	it("does render the cart button", async () => {
		const mocks = [
			{
				request: {
					query: CURRENT_USER_QUERY
				},
				result: {
					data: {
						me: mockedUser()
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Header />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(wrapper.exists("button#cart")).toEqual(true);
	});

	it("doesn't render the cart button", async () => {
		const mocks = [
			{
				request: {
					query: CURRENT_USER_QUERY
				},
				result: {
					data: {
						me: null
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Header />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(wrapper.exists("button#cart")).toEqual(false);
	});
});
