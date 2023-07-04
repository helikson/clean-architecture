import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "ID is required",
        context: "ProductB",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "ProductB",
      });
    }

    if (this._price <= 0) {
      this.notification.addError({
        message: "Price must be greater than zero",
        context: "ProductB",
      });
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price * 2;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
