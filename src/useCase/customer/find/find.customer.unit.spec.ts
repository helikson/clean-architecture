import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.useCase";

const customer = new Customer("123", "Tests");
const address = new Address("street", 1, "zip", "city");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

describe("Unit Test find customer use case", () => {
    it("should find customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const output = await useCase.execute({ id: "123" });

        expect(output).toEqual({
            id: "123",
            name: "Tests",
            address: {
                street: "street",
                city: "city",
                number: 1,
                zip: "zip",
            },
        });
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();

        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const useCase = new FindCustomerUseCase(customerRepository);

        expect(() => {
            return useCase.execute({ id: "123" });
        }).rejects.toThrow("Customer not found");
    });
});