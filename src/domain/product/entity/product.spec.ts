import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      const product = new Product("", "Produto 1", 100);
    }).toThrowError("Product: ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Produto 1", -1);
    }).toThrowError("Product: Price must be greater than zero");
  });

  it("should throw error when ID and name is empty and price is less than zero", () => {
    expect(() => {
      const product = new Product("", "", -1);
    }).toThrowError(
      "Product: ID is required, Product: Name is required, Product: Price must be greater than zero"
    );
  });

  it("should change name", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changeName("Produto 2");

    expect(product.name).toBe("Produto 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changePrice(150);

    expect(product.price).toBe(150);
  });
});
