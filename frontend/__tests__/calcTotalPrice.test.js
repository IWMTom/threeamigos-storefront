import calcTotalPrice from "../lib/calcTotalPrice";

describe("calcTotalPrice Lib Function", () => {
	const singleCartProduct = [
		{
			product: {
				price: 1099
			},
			quantity: 5
		}
	];

	const multipleCartProducts = [
		{
			product: {
				price: 1099
			},
			quantity: 5
		},
		{
			product: {
				price: 999
			},
			quantity: 3
		}
	];

	it("works with a single cart product", () => {
		expect(calcTotalPrice(singleCartProduct)).toEqual(5495);
	});

	it("works with multiple cart products", () => {
		expect(calcTotalPrice(multipleCartProducts)).toEqual(8492);
	});
});
