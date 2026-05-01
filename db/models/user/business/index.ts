import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { ProfileManagement } from "../../profile/business";
import { UserPersistor } from "../data/persistor";
import { User } from "../entity";
import bcrypt from 'bcrypt';
import { sequelize } from "../../../connection";
import { Transaction } from "sequelize";
import { AuthManagement } from "../../auth/business";
import { Role as RoleEntity } from "../../role/entity";
import { Role } from "../../../../permissions";


export const saltRound = 10

export class UserManagement {
    async users(requestedBy: User): Promise<User[]> {
        return new Promise(async (res, rej) => {
            try {
                if (!this.hasAccess(requestedBy.role)) {
                    throw new ApiError(`Forbidden`, StatusCodes.FORBIDDEN);
                }
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
                    const profile = await new ProfileManagement().profileByUserId(id);
                    if (!profile) {
                        return rej(new ApiError('Server error', StatusCodes.FAILED_DEPENDENCY))
                    }
                    res({
                        id: user.id,
                        role: user.role,
                        profile,
                    })
                } else rej(new ApiError('User not found', StatusCodes.NOT_FOUND))
            } catch (err) {
                rej(err)
            }
        })
    }

    // User creation via dashboard 
    async createUser(payload: any): Promise<User> {
        return new Promise(async (res, rej) => {
            const transaction = await sequelize.transaction();
            try {
                const err = this.validatorUserBody(payload);
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const generatePassword = Math.random().toString(); //TODO: Email generator 
                const hasedPassword = await bcrypt.hash(generatePassword, saltRound)

                const userInfo = await new UserPersistor().create(payload, transaction)
                if (userInfo?.id) {
                    await new AuthManagement().create({
                        userId: userInfo.id,
                        contact: payload.contact,
                        email: payload.email,
                        password: hasedPassword,
                    }, transaction);
                    await new ProfileManagement().createProfile({
                        contact: payload.contact,
                        email: payload.email,
                        user: { id: userInfo.id, role: userInfo.role }
                    }, transaction)
                    await transaction.commit()
                }
            } catch (err) {
                rej(err)
            }
        })
    }

    // General creation
    async create(payload: User, transaction?: Transaction): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const userInfo = await new UserPersistor().create(payload, transaction)
                return res(userInfo)
            } catch (err) {
                rej(err)
            }
        })
    }


    async deleteUser(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                await new UserPersistor().delete(id);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorUserBody(data: any) {
        const missingAttributes = []
        if (!data.role?.id) {
            missingAttributes.push("Role ID")
        }
        if (!data.contact) {
            missingAttributes.push("Contact")
        }
        if (!data.email) {
            missingAttributes.push("Email")
        }
        return missingAttributes
    }

    hasAccess(role: RoleEntity) {
        return role.name == Role.admin
    }
}

//transaction
//permissions - config
//user flow fix
//signup  