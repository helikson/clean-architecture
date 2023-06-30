import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.useCase";

const product1 = ProductFactory.create("a", "Product 1", 100);
const product2 = ProductFactory.create("b", "Product 2", 200);

const MockProductRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
});

describe("Unit Test for listing Product Use Case", () => {
    it("should list all products", async () => {
        const productRepository = MockProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const output = await useCase.execute({});

        expect(output).toEqual({
            products: [
                {
                    id: product1.id,
                    name: product1.name,
                    price: product1.price,
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price,
                },
            ],
        });
    });
});