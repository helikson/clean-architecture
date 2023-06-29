import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.useCase";

const customer = CustomerFactory.createWithAddress("Tests", new Address("street", 1, "zip", "city"));

const input = {
    id: customer.id,
    name: "Tests updated",
    address: {
        street: "street updated",
        city: "city updated",
        number: 2,
        zip: "zip updated",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

describe("Unit Test Update Customer Use Case", () => {
    it("should update a customer", async () => {
        const repository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(repository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});