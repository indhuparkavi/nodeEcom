
export class Role {
    id: string
    name?: string
    createdAt?: Date
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}