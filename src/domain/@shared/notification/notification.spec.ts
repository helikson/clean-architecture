import Notification from "./notification";

describe("Unit tests for notifications", () => {
    it("should create errors", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "Customer",
        }

        notification.addError(error);

        expect(notification.messages("Customer")).toBe("Customer: Error message");

        const error2 = {
            message: "Error message 2",
            context: "Customer",
        }

        notification.addError(error2);

        expect(notification.messages("Customer")).toBe("Customer: Error message, Customer: Error message 2");

        const error3 = {
            message: "Error message Order",
            context: "Order",
        }

        notification.addError(error3);

        expect(notification.messages("Customer")).toBe("Customer: Error message, Customer: Error message 2");

        expect(notification.messages()).toBe("Customer: Error message, Customer: Error message 2, Order: Error message Order");
    });

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "Customer",
        }

        notification.addError(error);

        expect(notification.hasErrors()).toBeTruthy();
    });

    it("should get all errors props", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "Customer",
        }

        notification.addError(error);

        expect(notification.errors).toEqual([error]);
    });
});