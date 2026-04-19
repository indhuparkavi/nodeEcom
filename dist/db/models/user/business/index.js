"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagement = void 0;
const http_status_codes_1 = require("http-status-codes");
const business_1 = require("../../address/business");
const entitys_1 = __importDefault(require("../../common/entitys"));
const business_2 = require("../../profile/business");
const persistor_1 = require("../data/persistor");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserManagement {
    async users() {
        return new Promise(async (res, rej) => {
            try {
                const users = await new persistor_1.UserPersistor().get();
                if (!users) {
                    return rej(new entitys_1.default('User not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res(users);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async user(id) {
        return new Promise(async (res, rej) => {
            try {
                const user = await new persistor_1.UserPersistor().getById(id);
                if (!user) {
                    return rej(new entitys_1.default('User not found', http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                if (user) {
                    const [profile, addresses] = await Promise.all([
                        await new business_2.ProfileManagement().profileByUserId(id),
                        await new business_1.AddressManagement().addressByUserId(id)
                    ]);
                    if (!profile || !addresses) {
                        return rej(new entitys_1.default('Server error', http_status_codes_1.StatusCodes.FAILED_DEPENDENCY));
                    }
                    res({
                        name: user.name,
                        contact: user.contact,
                        role: user.role,
                        profile,
                        addresses
                    });
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async userInfoForLogin(contact) {
        return new Promise(async (res, rej) => {
            try {
                const user = await new persistor_1.UserPersistor().userInfoForLogin(contact);
                if (user) {
                    res({
                        id: user.id,
                        name: user.name,
                        contact: user.contact,
                        role: user.role,
                        password: user.password
                    });
                }
                else
                    res(null);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async loginExistingUser(payload) {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.contact || !payload.password) {
                    throw new entitys_1.default(`Bad Request, missing contact or password info`, http_status_codes_1.StatusCodes.BAD_REQUEST);
                }
                const isUserExist = await this.userInfoForLogin(payload.contact);
                if (!isUserExist) {
                    throw new entitys_1.default(`User not Found`, http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                if (isUserExist.password && payload.password) {
                    const isPasswordMatch = await bcrypt_1.default.compareSync(payload.password, isUserExist.password);
                    if (!isPasswordMatch) {
                        return rej(new entitys_1.default(`Invalid password`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                    }
                }
                res(await this.generateToken(isUserExist));
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async createUser(payload) {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorUserBody(payload);
                if (err?.length) {
                    return rej(new entitys_1.default(`Bad Request, missing attributes are ${err.join(',')}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                if (payload.password) {
                    const saltRound = 10;
                    const hasedPassword = await bcrypt_1.default.hash(payload.password, saltRound);
                    const response = await new persistor_1.UserPersistor().create({
                        ...payload,
                        password: hasedPassword
                    });
                    res({
                        id: response.id,
                        contact: response.contact,
                        role: response.role,
                        name: response.name
                    });
                }
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async deleteUser(id) {
        return new Promise(async (res, rej) => {
            try {
                const response = await new persistor_1.UserPersistor().delete(id);
                res(response);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    generateToken(userInfo) {
        return new Promise(async (res, rej) => {
            try {
                const token = jsonwebtoken_1.default.sign({ id: userInfo.id }, "secret_key", { expiresIn: "8h" });
                res(token);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    validatorUserBody(data) {
        const missingAttributes = [];
        if (!data.contact) {
            missingAttributes.push("contact");
        }
        if (!data.password) {
            missingAttributes.push("password");
        }
        if (!data.name) {
            missingAttributes.push("name");
        }
        if (!data.role?.id) {
            missingAttributes.push("Role ID");
        }
        return missingAttributes;
    }
}
exports.UserManagement = UserManagement;
//# sourceMappingURL=index.js.map