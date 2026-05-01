import { Transaction } from "sequelize";
import { Role as RoleModel } from "./data/role";
import { Role } from "./entity";

export class RoleManangement {
    async roles(): Promise<Role[]> {
        return new Promise(async (res, rej) => {
            try {
                const roleRecords = await RoleModel.findAll();
                res(roleRecords);
            } catch (err) {
                rej(err)
            }
        })
    }
    async roleById(id: string, transaction?: Transaction): Promise<Role> {
        return new Promise(async (res, rej) => {
            try {
                const roleRecord = await RoleModel.findOne({
                    where: { id: id },
                    ...(transaction && transaction)
                })
                if (roleRecord)
                    res(roleRecord);
                else rej();
            } catch (err) {
                rej(err);
            }
        })
    }

    async roleByName(name: string, transaction?: Transaction): Promise<Role> {
        return new Promise(async (res, rej) => {
            try {
                const roleRecord = await RoleModel.findOne({
                    where: { name: name },
                    ...(transaction && transaction)
                })
                if (roleRecord)
                    res(roleRecord);
                else rej();
            } catch (err) {
                rej(err);
            }
        })
    }

}