import { AddressModel } from "..";
import { Address } from "../../entity";


export class AddressPersistor {
    async get(): Promise<Address[]> {
        return new Promise(async (res, rej) => {
            try {
                const addresses = await AddressModel.findAll();
                res(addresses);
            } catch (err) {
                rej(err)
            }
        })
    }
    async getById(id: string): Promise<Address> {
        return new Promise(async (res, rej) => {
            try {
                const address = await AddressModel.findOne({
                    where: { id: id }
                });
                if (address)
                    res(address);
            } catch (err) {
                rej(err)
            }
        })
    }

    async getByUserId(userId: string): Promise<Address[]> {
        return new Promise(async (res, rej) => {
            try {
                const address = await AddressModel.findAll({
                    where: { userId: userId }
                });
                res(address);
            } catch (err) {
                rej(err)
            }
        })
    }

    async create(addressInfo: Address): Promise<Address> {
        return new Promise(async (res, rej) => {
            try {
                if (!addressInfo.user.id) {
                    rej("User Id should not be null")
                    return;
                }
                const address = await AddressModel.create({
                    ...addressInfo,
                    createdAt: new Date(),
                    userId: addressInfo.user.id
                });
                if (address)
                    res(address);
            } catch (err) {
                rej(err)
            }
        })
    }

    async update(id: string, address: Address): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = await AddressModel.update(address, {
                    where: { id: id }
                });
                if (addressInfo[0] > 0)
                    res(id);
            } catch (err) {
                rej(err)
            }
        })
    }

    async delete(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const address = await AddressModel.destroy({
                    where: { id: id }
                });
                res(address);
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteUserAddress(userId: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const address = await AddressModel.destroy({
                    where: { userId: userId }
                });
                res(address);
            } catch (err) {
                rej(err)
            }
        })
    }
}