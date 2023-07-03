import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../useCase/product/create/create.product.useCase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../useCase/product/list/list.product.useCase";

export const productRouter = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());

    try {
        const productDTO = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const output = await useCase.execute(productDTO);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRouter.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());

    try {
        const output = await useCase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});