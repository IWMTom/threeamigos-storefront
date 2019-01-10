import formatMoney from "../lib/formatMoney";

describe("formatMoney Lib Function", () => {
	it("works with fractional pounds", () => {
		expect(formatMoney(1)).toEqual("£0.01");
		expect(formatMoney(10)).toEqual("£0.10");
		expect(formatMoney(9)).toEqual("£0.09");
		expect(formatMoney(53)).toEqual("£0.53");
	});

	it("works with whole pounds", () => {
		expect(formatMoney(100)).toEqual("£1");
		expect(formatMoney(5400)).toEqual("£54");
		expect(formatMoney(10000)).toEqual("£100");
		expect(formatMoney(50000000)).toEqual("£500,000");
	});

	it("works with whole and fractional pounds", () => {
		expect(formatMoney(101)).toEqual("£1.01");
		expect(formatMoney(5410)).toEqual("£54.10");
		expect(formatMoney(10009)).toEqual("£100.09");
		expect(formatMoney(50000053)).toEqual("£500,000.53");
	});
});
