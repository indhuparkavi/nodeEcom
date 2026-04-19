"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePersistor = void 0;
const __1 = __importDefault(require(".."));
class ProfilePersistor {
    // async get(): Promise<Profile[]> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const response = await ProfileModel.findAll();
    //             res(response);
    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }
    // async getById(id: string): Promise<Profile> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const response = await ProfileModel.findOne({
    //                 where: { id: id }
    //             });
    //             if (response)
    //                 res(response);
    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }
    async getByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.findOne({
                    where: { userId: userId }
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async create(payload) {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.user?.id) {
                    rej("User Id should not be null");
                    return;
                }
                const response = await __1.default.create({
                    ...payload,
                    createdAt: new Date(),
                    userId: payload.user.id
                });
                if (response)
                    res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async update(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const response = await __1.default.update(payload, {
                    where: { id: id }
                });
                if (response[0] > 0)
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
                const response = await __1.default.destroy({
                    where: { id: id }
                });
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.ProfilePersistor = ProfilePersistor;
//# sourceMappingURL=index.js.map