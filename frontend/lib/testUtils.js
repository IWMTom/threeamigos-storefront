import casual from "casual";

casual.seed(666);

const mockedProduct = () => ({
  __typename: "Product",
  id: "abcdefghijklmnopqrst",
  name: "Abc Def",
  image_url: "http://placehold.it/100x100",
  description: "dfghsdfidsfiosd",
  price: "199",
  sale: true,
  stock: 10,
  category: {
    name: "cat1",
    icon: "ic_bookmark"
  },
  brand: {
    name: "brand1"
  }
});

const mockedUser = () => ({
  __typename: "User",
  id: casual.uuid,
  name: casual.name,
  photo_url: `${casual.word}.jpg`,
  cart: []
});

const mockedOrder = () => ({
  __typename: "Order",
  id: casual.uuid,
  total: 40000,
  products: [mockedOrderProduct(), mockedOrderProduct()]
});

const mockedOrderProduct = () => ({
  __typename: "OrderProduct",
  id: "abcdefghijklmnopqrst",
  slug: "abc-def",
  sale: true,
  name: "Abc Def",
  image_url: "http://placehold.it/100x100",
  price: "199",
  quantity: 1
});

const mockedCartProduct = overrides => ({
  __typename: "CartProduct",
  id: casual.uuid,
  quantity: 3,
  product: mockedProduct(),
  user: mockedUser(),
  ...overrides
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  mockedProduct,
  mockedUser,
  mockedCartProduct,
  mockedOrder,
  mockedOrderProduct
};
