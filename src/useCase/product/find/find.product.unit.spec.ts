import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.useCase";

const product = ProductFactory.create("a", "Product 1", 100);

const MockProductRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
});

describe("Unit Test for finding Product Use Case", () => {
    it("should find a product", async () => {
        const productRepository = MockProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const output = await findProductUseCase.execute({ id: product.id });

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("should not find a product", async () => {
        const productRepository = MockProductRepository();

        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const useCase = new FindProductUseCase(productRepository);

        expect(() => {
            return useCase.execute({ id: "123" });
        }).rejects.toThrow("Product not found");
    });
});