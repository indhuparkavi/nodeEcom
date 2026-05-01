import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Profile } from "../entity";
import { ProfilePersistor } from "../data/persistor";
import { Transaction } from "sequelize";
import { AuthManagement } from "../../auth/business";
import { sequelize } from "../../../connection";


export class ProfileManagement {

    async profileByUserId(userId: string): Promise<Profile> {
        return new Promise(async (res, rej) => {
            try {
                const response = await new ProfilePersistor().getByUserId(userId);
                if (!response) {
                    return rej(new ApiError("Profile not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createProfile(payload: Profile, transaction?: Transaction): Promise<Profile> {
        return new Promise(async (res, rej) => {
            try {
                if (!payload.user?.id) {
                    return rej(new ApiError(`Bad requiest user id is required`, StatusCodes.BAD_REQUEST));
                }
                const response = new ProfilePersistor().create(payload, transaction)
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateProfile(id: string, userId: string, payload: Profile): Promise<string> {
        return new Promise(async (res, rej) => {
            const transaction = await sequelize.transaction();
            try {
                console.log('1');

                if (payload.contact || payload.email) {
                    await new AuthManagement().updateContactEmail({ contact: payload.contact, email: payload.email, userId }, userId, transaction)
                }
                console.log('2');

                const profileInfo = await new ProfilePersistor().update(id, payload, transaction);
                await transaction.commit();
                console.log('3');

                if (profileInfo) return res(profileInfo)
                rej(new ApiError(`Not Found`, StatusCodes.NOT_FOUND))
            } catch (err) {
                await transaction.rollback();
                rej(err)
            }
        })
    }

}

