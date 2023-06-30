import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.useCase";

describe("Test list product use case", () => {
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

    it("should list product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product = ProductFactory.create("a", "Tests", 1);
        await productRepository.create(product);

        const product2 = ProductFactory.create("b", "Tests2", 2);
        await productRepository.create(product2);

        const output = await useCase.execute({});

        expect(output).toEqual({
            products: [{
                id: product.id,
                name: product.name,
                price: product.price
            }, {
                id: product2.id,
                name: product2.name,
                price: product2.price
            }]
        });
    });
});