import express from "express";
import * as dotenv from "dotenv";
dotenv.config(); // this line should be executed before importing config
import "./config/config";
import { sequelize } from "./db/connection";
import { roleRoute } from "./db/models/role/router";
import { categoryRoute } from "./db/models/category/routes";
import { subCategoryRoute } from "./db/models/subCategory/routes";
import { addressRoute } from "./db/models/address/routes";
import { profileRoute } from "./db/models/profile/routes";
import { userRoute } from "./db/models/user/routes";
import { productRoute } from "./db/models/product/routes";
import { orderRoute } from "./db/models/order/routes";
import { invoiceRoute } from "./db/models/invoice/routes";
import { paymentRoute } from "./db/models/payment/routes";
import { deliveryRoute } from "./db/models/delivery/routes";
import { ProductManagement } from "./db/models/product/business";
import fs from 'fs/promises';
import { authRoute } from "./db/models/auth/routes";


const app = express();

const port = process.env.PORT || 5000

app.use(express.json());

app.use("/api/roles", roleRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/subCategories", subCategoryRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/deliveries", deliveryRoute);
app.use("/api", authRoute);


app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        const transaction = await sequelize.transaction()
        // try {
        //     const data = await fs.readFile('./data/product.json', 'utf-8');
        //     const products = JSON.parse(data);


        //     for (const product of products) {
        //         try {
        //             const manage = new ProductManagement();
        //             await manage.createProduct(product);
        //         } catch (err: any) {
        //             if (err?.statusCode != 409) {
        //                 throw err;
        //             }
        //         }
        //     }
        //     await transaction.commit()
        //     console.log('Successfully seeded products');

        // } catch (err) {
        //     await transaction.rollback()
        //     console.error('Failed seeded products');
        // }

        app.listen(port, () => {
            console.log('App Running');
        });

    } catch (err) {
        console.error('Unable to connect to DB:', err);
    }
};

startServer();