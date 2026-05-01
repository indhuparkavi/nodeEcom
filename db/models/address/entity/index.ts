import { User } from "../../user/entity";

export class Address {
    id?: string;
    addressType: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    default?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    user: User;
    constructor(addressType: string, street: string, state: string, city: string, country: string, zip: string, user: User) {
        this.addressType = addressType;
        this.city = city;
        this.street = street;
        this.state = state;
        this.country = country;
        this.zip = zip;
        this.user = user;
    }
}