"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPersistor = void 0;
const user_1 = __importDefault(require("../user"));
class UserPersistor {
    async get() {
        return new Promise(async (res, rej) => {
            try {
                const users = await user_1.default.findAll();
                res(users);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (res, rej) => {
            try {
                const user = await user_1.default.findOne({
                    where: { id: id }
                });
                if (user)
                    res(user);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async userInfoForLogin(contact) {
        return new Promise(async (res, rej) => {
            try {
                const user = await user_1.default.findOne({
                    where: { contact: contact }
                });
                res(user);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async create(data) {
        return new Promise(async (res, rej) => {
            try {
                if (data.password) {
                    const user = await user_1.default.create({
                        ...data,
                        createdAt: new Date(),
                        roleId: data?.role?.id,
                        password: data.password,
                        active: true,
                    });
                    if (user)
                        res(user);
                }
            }
            catch (err) {
                console.log("persist:p", err);
                rej(err);
            }
        });
    }
    async update(id, data) {
        return new Promise(async (res, rej) => {
            try {
                const payload = {
                    ...data,
                    roleId: data?.role?.id,
                };
                const user = await user_1.default.update(payload, {
                    where: { id: id }
                });
                if (user)
                    res(data);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async delete(id) {
        return new Promise(async (res, rej) => {
            try {
                const user = await user_1.default.destroy({
                    where: { id: id }
                });
                res(user);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.UserPersistor = UserPersistor;
//# sourceMappingURL=index.js.map