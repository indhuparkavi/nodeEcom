import { User } from "../../user/entity";

export class Profile {
    id?: string;
    name?: string;
    contact?: string;
    email?: string;
    gender?: string;
    dob?: Date;
    gst?: string;
    pan?: string;
    businessType?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
    constructor(gender: string, dob: Date, gst: string, businessType: string, pan: string, user: User, name: string) {
        this.gender = gender;
        this.name = name;
        this.dob = dob;
        this.gst = gst;
        this.pan = pan;
        this.businessType = businessType;
        this.user = user;
    }
}