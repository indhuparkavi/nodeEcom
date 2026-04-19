"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
class AddressManagement {
    // async addresses(): Promise<Address[]> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const address = new AddressPersistor().get()
    //             res(address);
    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }
    async addressByUserId(id) {
        return new Promise(async (res, rej) => {
            try {
                const address = new persistor_1.AddressPersistor().getByUserId(id);
                if (!address) {
                    return rej(new entitys_1.default("Address not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(address);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createAddress(address) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorAddressBody(address);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const addressInfo = new persistor_1.AddressPersistor().create(address);
                res(addressInfo);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updateAddress(id, address) {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new persistor_1.AddressPersistor().update(id, address);
                res(addressInfo);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async deleteAddress(id) {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new persistor_1.AddressPersistor().delete(id);
                res(addressInfo);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorAddressBody(address) {
        const missingAttributes = [];
        if (!address.addressType) {
            missingAttributes.push("addressType");
        }
        if (!address.street) {
            missingAttributes.push("street");
        }
        if (!address.city) {
            missingAttributes.push("city");
        }
        if (!address.state) {
            missingAttributes.push("state");
        }
        if (!address.country) {
            missingAttributes.push("country");
        }
        if (!address.zip) {
            missingAttributes.push("zip");
        }
        if (!address.user?.id) {
            missingAttributes.push("user id");
        }
        return missingAttributes;
    }
}
exports.AddressManagement = AddressManagement;
//# sourceMappingURL=index.js.map