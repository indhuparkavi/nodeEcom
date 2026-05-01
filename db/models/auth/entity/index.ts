
export class Auth {
    id?: string;
    email?: string;
    userId: string;
    contact?: string;
    password?: string;
    isEmailVerified?: boolean;
    isContactVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(userId: string, email: string, contact: string, password: string) {
        this.userId = userId
        this.email = email;
        this.password = password;
        this.contact = contact;
    }
}

