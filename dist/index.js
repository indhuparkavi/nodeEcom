"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // this line should be executed before importing config
require("./config/config");
const connection_1 = require("./db/connection");
const router_1 = require("./db/models/role/router");
const routes_1 = require("./db/models/category/routes");
const routes_2 = require("./db/models/subCategory/routes");
const routes_3 = require("./db/models/address/routes");
const routes_4 = require("./db/models/profile/routes");
const routes_5 = require("./db/models/user/routes");
const routes_6 = require("./db/models/product/routes");
const routes_7 = require("./db/models/order/routes");
const routes_8 = require("./db/models/invoice/routes");
const routes_9 = require("./db/models/payment/routes");
const routes_10 = require("./db/models/delivery/routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
connection_1.sequelize.authenticate().then(async () => {
    console.log('Database Connected');
}).catch(err => console.log(err));
app.use(express_1.default.json());
app.use("/api/roles", router_1.roleRoute);
app.use("/api/categories", routes_1.categoryRoute);
app.use("/api/subCategories", routes_2.subCategoryRoute);
app.use("/api/addresses", routes_3.addressRoute);
app.use("/api/profiles", routes_4.profileRoute);
app.use("/api/users", routes_5.userRoute);
app.use("/api/products", routes_6.productRoute);
app.use("/api/orders", routes_7.orderRoute);
app.use("/api/invoices", routes_8.invoiceRoute);
app.use("/api/payments", routes_9.paymentRoute);
app.use("/api/deliveries", routes_10.deliveryRoute);
app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});
try {
    app.listen(port, () => {
        console.log('App Running');
    });
}
catch (err) {
    console.error('App run time error', err);
}
//# sourceMappingURL=index.js.map