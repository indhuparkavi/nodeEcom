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
    async roleById(id: string): Promise<Role> {
        return new Promise(async (res, rej) => {
            try {
                const roleRecord = await RoleModel.findOne({
                    where: { id: id }
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