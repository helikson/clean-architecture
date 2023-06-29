import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.useCase";

const product = ProductFactory.create("a", "Product A", 100);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit Test for creating Product Use Case", () => {
    it("should create a product", async () => {
        const repository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(repository);

        await productCreateUseCase.execute({
            type: "a",
            name: product.name,
            price: product.price,
        });

        const output = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        expect(output.id).toEqual(product.id);
        expect(output.name).toEqual(product.name);
        expect(output.price).toEqual(product.price);
    });
});