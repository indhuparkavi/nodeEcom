import { Transaction } from "sequelize";
import ProfileModel from "..";
import { Profile } from "../../entity";


export class ProfilePersistor {
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

    async getByUserId(userId: string): Promise<Profile | null> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProfileModel.findOne({
                    where: { userId: userId }
                });
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(payload: Profile, transaction?: Transaction): Promise<Profile> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.user?.id) {
                    rej("User Id should not be null")
                    return;
                }
                const response = await ProfileModel.create({
                    ...payload,
                    createdAt: new Date(),
                    userId: payload.user.id
                }, transaction ? { transaction } : {});
                if (response)
                    res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, payload: Profile, transaction?: Transaction): Promise<string | null> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProfileModel.update(payload, {
                    where: { id },
                    transaction,
                });
                if (response[0] > 0)
                    res(id);
                else res(null)
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteByUser(userId: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const response = await ProfileModel.destroy({
                    where: { userId: userId }
                });
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
}