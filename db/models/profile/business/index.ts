import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { Profile } from "../entity";
import { ProfilePersistor } from "../data/persistor";


export class ProfileManagement {

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
    async profileByUserId(userId: string): Promise<Profile> {
        return new Promise(async (res, rej) => {
            try {
                const response = new ProfilePersistor().getByUserId(userId);
                if (!response) {
                    return rej(new ApiError("Profile not found", StatusCodes.NOT_FOUND))
                }
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }
    async createProfile(payload: Profile): Promise<Profile> {
        return new Promise(async (res, rej) => {
            try {
                //TODO
                console.log(payload, "pay")
                if (!payload.user?.id) {
                    return rej(new ApiError(`Bad requiest user id is required`, StatusCodes.BAD_REQUEST));
                }
                const response = new ProfilePersistor().create(payload)
                res(response);
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateProfile(id: string, payload: Profile): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const profileInfo = new ProfilePersistor().update(id, payload);
                res(profileInfo);
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteUserProfile(id: string,): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const profileInfo = new ProfilePersistor().deleteByUser(id);
                res(profileInfo);
            } catch (err) {
                rej(err)
            }
        })
    }

}

