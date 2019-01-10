import CheckoutHeader from "../components/CheckoutHeader";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

const step = 3;

describe("<CheckoutHeader />", () => {
	it("renders and matches the snapshot", () => {
		const wrapper = shallow(<CheckoutHeader step={step} />);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
