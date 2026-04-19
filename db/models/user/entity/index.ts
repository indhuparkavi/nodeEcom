import { Address } from "../../address/entity";
import { Profile } from "../../profile/entity";
import { Role } from "../../role/entity";

export class User {
    id?: string;
    contact: number;
    email?: string;
    password?: string;
    role: Role;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    profile?: Profile;
    addresses?: Address[];

    constructor(contact: number, password: string, role: Role) {
        this.contact = contact;
        this.password = password;
        this.role = role;
    }
}