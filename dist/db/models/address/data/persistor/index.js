"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressPersistor = void 0;
const __1 = require("..");
class AddressPersistor {
    async get() {
        return new Promise(async (res, rej) => {
            try {
                const addresses = await __1.AddressModel.findAll();
                res(addresses);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const address = await __1.AddressModel.findOne({
                    where: { id: id }
                });
                if (address)
                    res(address);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                const address = await __1.AddressModel.findAll({
                    where: { userId: userId }
                });
                res(address);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async create(addressInfo) {
        return new Promise(async (res, rej) => {
            try {
                if (!addressInfo.user.id) {
                    rej("User Id should not be null");
                    return;
                }
                const address = await __1.AddressModel.create({
                    ...addressInfo,
                    createdAt: new Date(),
                    userId: addressInfo.user.id
                });
                if (address)
                    res(address);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async update(id, address) {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = await __1.AddressModel.update(address, {
                    where: { id: id }
                });
                if (addressInfo[0] > 0)
                    res(id);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async delete(id) {
        return new Promise(async (res, rej) => {
            try {
                const address = await __1.AddressModel.destroy({
                    where: { id: id }
                });
                res(address);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.AddressPersistor = AddressPersistor;
//# sourceMappingURL=index.js.map