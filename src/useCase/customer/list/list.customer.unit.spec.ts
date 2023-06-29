import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.useCase";

const customer1 = CustomerFactory.createWithAddress("Tests", new Address("street", 1, "zip", "city"));
const customer2 = CustomerFactory.createWithAddress("Tests 2", new Address("street 2", 2, "zip 2", "city 2"));

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
}

describe("Unit Test for listing Customer Use Case", () => {
    it("should list all customers", async () => {
        const repository = MockRepository();
        const customerListUseCase = new ListCustomerUseCase(repository);

        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toEqual(customer1.id);
        expect(output.customers[0].name).toEqual(customer1.name);
        expect(output.customers[0].address.street).toEqual(customer1.address.street);
        expect(output.customers[1].id).toEqual(customer2.id);
        expect(output.customers[1].name).toEqual(customer2.name);
        expect(output.customers[1].address.street).toEqual(customer2.address.street);
    });
});
