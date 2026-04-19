
export class Category {
    id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(name: string, id: string) {
        this.id = id;
        this.name = name;
    }
}