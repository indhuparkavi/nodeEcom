import { SubCategory } from "../../subCategory/entity";

export class Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    image: string;
    stock: string;
    subCategory: SubCategory;
    type?: string;
    color?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(name: string, price: number, description: string, image: string, stock: string, subCategory: SubCategory) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.image = image;
        this.subCategory = subCategory;
    }
}