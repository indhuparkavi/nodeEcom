import { StatusCodes } from "http-status-codes";
import ApiError, { SuccessResponse } from "../../common/entitys";
import { AuthPersistor } from "../data/persistor";
import { Auth } from "../entity";
import { sequelize } from "../../../connection";
import { UserManagement } from "../../user/business";
import { RoleManangement } from "../../role/services";
import { ProfileManagement } from "../../profile/business";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Role from "../../role/data/role";
import { User } from "../../user/entity";
import { Transaction } from "sequelize";

const saltRound = 10

export class AuthManagement {

    async signUp(payload: Auth, roleName: string): Promise<string> {
        return new Promise(async (res, rej) => {
            const transaction = await sequelize.transaction();
            try {
                const err = this.validatorAuthBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }

                const role = await new RoleManangement().roleByName(roleName, transaction)
                if (role.id && payload.password) {
                    const hasedPassword = await bcrypt.hash(payload.password, saltRound)
                    const userInfo = await new UserManagement().create({ role }, transaction);
                    if (userInfo?.id) {
                        await new AuthPersistor().create({
                            userId: userInfo.id,
                            contact: payload.contact,
                            email: payload.email,
                            password: hasedPassword,
                        }, transaction);

                        await new ProfileManagement().createProfile({
                            contact: payload.contact,
                            email: payload.email,
                            user: { id: userInfo.id, role: role }
                        }, transaction)

                        await transaction.commit();
                        res("Created successfully")
                    }
                }
                return rej(new ApiError(`Something went wrong`, StatusCodes.INTERNAL_SERVER_ERROR))

            } catch (err) {
                await transaction.rollback()
                rej(err)
            }
        })
    }

    async login(payload: Auth): Promise<string> {
        return new Promise(async (res, rej) => {
            const t = await sequelize.transaction();
            try {
                const err = this.validatorAuthBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const isUserExist = await new AuthPersistor().getByEmailContact(payload?.contact ?? payload.email);
                if (isUserExist.id && payload.password && isUserExist.password) {
                    const isMatch = await bcrypt.compareSync(payload.password, isUserExist.password);
                    if (isMatch) {
                        const getUserInfo = await new UserManagement().user(isUserExist.userId);
                        res(this.generateToken(getUserInfo));
                    }
                    return rej(new ApiError(`Ivalid password`, StatusCodes.BAD_REQUEST))
                }
                return rej(new ApiError(`User not found`, StatusCodes.NOT_FOUND))

            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Auth, transaction?: Transaction): Promise<boolean> {
        return new Promise(async (res, rej) => {
            try {
                const response = await new AuthPersistor().create(payload, transaction)
                res(response)
            } catch (err) {
                rej(err)
            }
        })
    }

    async resetPassword(payload: any, user: User, transaction?: Transaction): Promise<void> {
        return new Promise(async (res, rej) => {
            try {
                if (user.id) {
                    const response = await new AuthPersistor().getByUserId(user.id)
                    if (!response.id) {
                        return rej(new ApiError(`User not found`, StatusCodes.BAD_REQUEST))
                    }
                    if (response.password) {
                        const isMatch = await bcrypt.compareSync(payload.currentPassword, response.password);
                        if (isMatch) {
                            const hasedPassword = await bcrypt.hash(payload.newPassword, saltRound);
                            await new AuthPersistor().updatePassword(response.id, hasedPassword, transaction)
                        }
                    }
                    return rej(new ApiError(`Invaild current password`, StatusCodes.BAD_REQUEST))
                }
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateContactEmail(payload: Auth, userId: string, transaction?: Transaction): Promise<boolean> {
        return new Promise(async (res, rej) => {
            try {
                const response = await new AuthPersistor().updateContactEmail(userId, payload.contact, payload.email, transaction)
                return res(response)
            } catch (err) {
                rej(err)
            }
        })
    }

    generateToken(userInfo: User): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const token = jwt.sign({ id: userInfo.id, role: userInfo.role }, "secret_key", { expiresIn: "2h" });
                res(token);

            } catch (err) {
                rej(err)
            }
        })
    }

    validatorAuthBody(body: Auth) {
        const missingAttributes = []
        if (!body.contact && !body.email) {
            missingAttributes.push("contact/email")
        }

        if (!body.password) {
            missingAttributes.push(body.password)
        }

        return missingAttributes
    }
}

