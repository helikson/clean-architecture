import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "ID is required",
        context: "Customer",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "Customer",
      });
    }
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  isActive(): boolean {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }
}
