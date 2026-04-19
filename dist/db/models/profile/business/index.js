"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const entitys_1 = __importDefault(require("../../common/entitys"));
const persistor_1 = require("../data/persistor");
class ProfileManagement {
    // async profileById(id: string): Promise<Profile> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const response = new ProfilePersistor().getById(id);
    //             if (!response) {
    //                 return rej(new ApiError("Profile not found", StatusCodes.NOT_FOUND))
    //             }
    //             res(response);
    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }
    async profileByUserId(userId) {
        return new Promise(async (res, rej) => {
            try {
                const response = new persistor_1.ProfilePersistor().getByUserId(userId);
                if (!response) {
                    return rej(new entitys_1.default("Profile not found", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createProfile(payload) {
        return new Promise(async (res, rej) => {
            try {
                //TODO
                console.log(payload, "pay");
                if (!payload.user?.id) {
                    return rej(new entitys_1.default(`Bad requiest user id is required`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const response = new persistor_1.ProfilePersistor().create(payload);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async updateProfile(id, payload) {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new persistor_1.ProfilePersistor().update(id, payload);
                res(addressInfo);
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.ProfileManagement = ProfileManagement;
//# sourceMappingURL=index.js.map