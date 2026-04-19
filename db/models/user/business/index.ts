import { StatusCodes } from "http-status-codes";
import { AddressManagement } from "../../address/business";
import ApiError from "../../common/entitys";
import { ProfileManagement } from "../../profile/business";
import { UserPersistor } from "../data/persistor";
import { User } from "../entity";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize } from "../../../connection";


export class UserManagement {
    async users(): Promise<User[]> {
        return new Promise(async (res, rej) => {
            try {
                const users = await new UserPersistor().get();
                if (!users) {
                    return rej(new ApiError('User not found', StatusCodes.NOT_FOUND))
                }

                res(users)
            } catch (err) {
                rej(err)
            }
        })
    }
    async user(id: string): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const user = await new UserPersistor().getById(id);
                if (!user) {
                    return rej(new ApiError('User not found', StatusCodes.NOT_FOUND))
                }
                if (user) {
                    const [profile, addresses] = await Promise.all([
                        await new ProfileManagement().profileByUserId(id),
                        await new AddressManagement().addressByUserId(id)
                    ])
                    if (!profile || !addresses) {
                        return rej(new ApiError('Server error', StatusCodes.FAILED_DEPENDENCY))
                    }
                    res({
                        contact: user.contact,
                        role: user.role,
                        profile,
                        addresses
                    })
                }
            } catch (err) {
                rej(err)
            }
        })
    }

    async userInfoForLogin(contact: number): Promise<User | null> {
        return new Promise(async (res, rej) => {
            try {
                const user = await new UserPersistor().userInfoForLogin(contact);
                if (user) {
                    res({
                        id: user.id,
                        contact: user.contact,
                        role: user.role,
                        password: user.password
                    })
                } else res(null)
            } catch (err) {
                rej(err)
            }
        })
    }


    async loginExistingUser(payload: User): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.contact || !payload.password) {
                    throw new ApiError(`Bad Request, missing contact or password info`, StatusCodes.BAD_REQUEST)
                }
                const isUserExist = await this.userInfoForLogin(payload.contact);
                if (!isUserExist) {
                    throw new ApiError(`User not Found`, StatusCodes.NOT_FOUND)
                }
                if (isUserExist.password && payload.password) {
                    const isPasswordMatch = await bcrypt.compareSync(payload.password, isUserExist.password);
                    if (!isPasswordMatch) {
                        return rej(new ApiError(`Invalid password`, StatusCodes.BAD_REQUEST))
                    }
                }
                res(await this.generateToken(isUserExist));
            } catch (err) {
                rej(err)
            }
        })
    }

    async createUser(payload: User): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorUserBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                if (payload.password) {
                    const saltRound = 10
                    const hasedPassword = await bcrypt.hash(payload.password, saltRound)
                    const response = await new UserPersistor().create({
                        ...payload,
                        password: hasedPassword
                    })
                    res({
                        id: response.id,
                        contact: response.contact,
                        role: response.role,
                    });
                }
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteUser(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            const t = await sequelize.transaction();
            try {
                await new AddressManagement().deleteAddressByUser(id);
                await new ProfileManagement().deleteUserProfile(id)
                const response = await new UserPersistor().delete(id);
                res(response)
                await t.commit();
            } catch (err) {
                await t.rollback();
                rej(err)
            }
        })
    }

    async update(id: string, payload: User): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                let info = {} as User;
                if (payload.email) info.email = payload.email;
                if (payload.role?.id) info.role = {
                    id: payload.role.id,
                    name: payload.role?.name
                };

                const response = await new UserPersistor().update(id, info);
                res(response)
            } catch (err) {
                rej(err)
            }
        })
    }

    generateToken(userInfo: User): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const token = jwt.sign({ id: userInfo.id }, "secret_key", { expiresIn: "8h" });
                res(token);

            } catch (err) {
                rej(err)
            }
        })
    }

    validatorUserBody(data: User) {
        const missingAttributes = []
        if (!data.contact) {
            missingAttributes.push("contact")
        }
        if (!data.password) {
            missingAttributes.push("password")
        }
        if (!data.role?.id) {
            missingAttributes.push("Role ID")
        }
        return missingAttributes
    }

}

//transaction
//permissions - config
//user flow fix
//signup  