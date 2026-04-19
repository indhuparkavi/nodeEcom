
export class SubCategory {
    id?: string;
    name: string;
    categoryId: string;

    constructor(name: string, categoryId: string) {
        this.name = name;
        this.categoryId = categoryId;
    }
}