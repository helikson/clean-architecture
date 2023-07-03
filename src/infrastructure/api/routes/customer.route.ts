import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../useCase/customer/create/create.customer.useCase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../useCase/customer/list/list.customer.useCase";

export const customerRouter = express.Router();

customerRouter.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDTO = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        };

        const output = await useCase.execute(customerDTO);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRouter.get("/", async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());

    try {
        const output = await useCase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});