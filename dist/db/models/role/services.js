"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleManangement = void 0;
const role_1 = require("./data/role");
class RoleManangement {
    async roles() {
        return new Promise(async (res, rej) => {
            try {
                const roleRecords = await role_1.Role.findAll();
                res(roleRecords);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    async roleById(id) {
        return new Promise(async (res, rej) => {
            try {
                const roleRecord = await role_1.Role.findOne({
                    where: { id: id }
                });
                if (roleRecord)
                    res(roleRecord);
                else
                    rej();
            }
            catch (err) {
                rej(err);
            }
        });
    }
}
exports.RoleManangement = RoleManangement;
//# sourceMappingURL=services.js.map