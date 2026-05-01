import UserModel from "../user";
import { User } from "../../entity";
import { Transaction } from "sequelize";
import Role from "../../../role/data/role";


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
    async getById(id: string): Promise<User | null> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.findOne({
                    where: { id },
                    include: [
                        {
                            model: Role,
                            as: 'role',
                            attributes: ['id', 'name']  // pick only what you need
                        }
                    ]
                });
                if (user) {
                    res({
                        id: user.id,
                        role: {
                            id: user.role.id,
                            name: user.role.name,
                        }
                    });
                } else res(null)

            } catch (err) {
                rej(err)
            }
        })
    }

    async create(data: User, transaction?: Transaction): Promise<User> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.create({
                    ...data,
                    createdAt: new Date(),
                    roleId: data?.role?.id,
                    active: true,
                }, transaction ? { transaction } : {});
                if (user)
                    res(user);
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

    async delete(id: string): Promise<void> {
        return new Promise(async (res, rej) => {
            try {
                const user = await UserModel.update({ active: false }, {
                    where: { id: id }
                });
            } catch (err) {
                rej(err)
            }
        })
    }

}