import { Op, Transaction } from "sequelize";
import { AuthModel } from "..";
import { Auth } from "../../entity";
import ApiError from "../../../common/entitys";
import { StatusCodes } from "http-status-codes";


export class AuthPersistor {

    async getByEmailContact(contact?: string, email?: string): Promise<Auth> {
        return new Promise(async (res, rej) => {
            try {
                const orConditions = [];
                if (contact) orConditions.push({ contact });
                if (email) orConditions.push({ email });
                const auth = await AuthModel.findOne({
                    where: {
                        [Op.or]: orConditions
                    }
                });
                if (auth)
                    res(auth)
                else rej(new ApiError(`User not Found`, StatusCodes.NOT_FOUND))
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByUserId(userId: string): Promise<Auth> {
        return new Promise(async (res, rej) => {
            try {
                const auth = await AuthModel.findOne({
                    where: { userId: userId }
                });
                if (auth)
                    res(auth)
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Auth, transaction?: Transaction): Promise<boolean> {
        return new Promise(async (res, rej) => {
            try {
                console.log('AuthModel.create')
                const response = await AuthModel.create({
                    ...payload,
                    createdAt: new Date()
                }, transaction ? { transaction } : {});
                res(true)
            } catch (err) {
                rej(err)
            }
        })
    }

    async updatePassword(id: string, password: string, transaction?: Transaction): Promise<boolean> {
        return new Promise(async (res, rej) => {
            try {
                await AuthModel.update({ password }, {
                    where: { id: id },
                    transaction: transaction,
                });
                res(true)
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateContactEmail(userId: string, contact?: string, email?: string, transaction?: Transaction): Promise<boolean> {
        return new Promise(async (res, rej) => {
            try {
                const response = await AuthModel.update({ contact, email }, {
                    where: { userId },
                    transaction: transaction,
                });
                console.log(response, 'response');

                res(true)
            } catch (err) {
                rej(err)
            }
        })
    }

    // async forgetPassword(id: string, address: Auth): Promise<string> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const addressInfo = await AuthModel.update(address, {
    //                 where: { id: id }
    //             });

    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }

}