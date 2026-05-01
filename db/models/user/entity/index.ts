import { Address } from "../../address/entity";
import { Profile } from "../../profile/entity";
import { Role } from "../../role/entity";

export class User {
    id?: string;
    role: Role;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    profile?: Profile;
    addresses?: Address[];

    constructor(contact: number, password: string, role: Role) {
        this.role = role;
    }
}