import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.useCase";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true,
            },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute({
            type: "a",
            name: "Tests",
            price: 1
        });

        expect(output).toEqual({
            id: expect.any(String),
            name: "Tests",
            price: 1
        });
    });
});