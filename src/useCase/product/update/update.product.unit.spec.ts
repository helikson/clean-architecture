import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.useCase";

const product = ProductFactory.create("a", "Test Product", 100);

const input = {
    id: product.id,
    name: "Test Product Updated",
    price: 200,
};

const MockProductRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
});


describe("Unit Test for updating Product Use Case", () => {
    it("should update a product", async () => {
        const productRepository = MockProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });
});