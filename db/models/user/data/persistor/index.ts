import UserModel from "../user";
import { User } from "../../entity";


export class UserPersistor {
    async get(): Promise<User[]> {
        return new Promise(async (res, rej) => {
            try {
                const users = await UserModel.findAll();
                res(users);
            } catch (err) {
                rej(err)
            }
        })
    }
    async getById(id: string): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.findOne({
                    where: { id: id }
                });
                if (user)
                    res(user);
            } catch (err) {
                rej(err)
            }
        })
    }

    async userInfoForLogin(contact: number): Promise<User | null> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.findOne({
                    where: { contact: contact }
                });
                res(user);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(data: User): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                if (data.password) {
                    const user = await UserModel.create({
                        ...data,
                        createdAt: new Date(),
                        roleId: data?.role?.id,
                        password: data.password,
                        active: true,
                    });
                    if (user)
                        res(user);
                }
            } catch (err) {
                console.log("persist:p", err)
                rej(err)
            }
        })
    }
    async update(id: string, data: User): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const payload = {
                    ...data,
                    roleId: data?.role?.id,
                }
                const user = await UserModel.update(payload, {
                    where: { id: id }
                });
                if (user)
                    res(data);
            } catch (err) {
                rej(err)
            }
        })
    }

    async delete(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.destroy({
                    where: { id: id }
                });
                res(user);
            } catch (err) {
                rej(err)
            }
        })
    }

}