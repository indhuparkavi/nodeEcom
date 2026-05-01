import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { AddressPersistor } from "../data/persistor";
import { Address } from "../entity";
import { Transaction } from "sequelize";
import { sequelize } from "../../../connection";


export class AddressManagement {

    async addressByUserId(id: string): Promise<Address[]> {
        return new Promise(async (res, rej) => {
            try {
                const address = new AddressPersistor().getByUserId(id);
                if (!address) {
                    return rej(new ApiError("Address not found", StatusCodes.NOT_FOUND))
                }
                res(address);
            } catch (err) {
                rej(err)
            }
        })
    }

    async createAddress(address: Address): Promise<Address> {
        return new Promise(async (res, rej) => {
            try {
                const err = this.validatorAddressBody(address);
                if (address?.user?.id) {
                    const userAddress = await new AddressPersistor().getByUserId(address.user.id);
                    if (userAddress.length) {
                        address.default = false
                    } else address.default = true;
                    if (err?.length) {
                        return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                    }
                    const addressInfo = new AddressPersistor().create(address)
                    res(addressInfo);
                }
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateAddress(id: string, address: Address, userId: string): Promise<string> {
        return new Promise(async (res, rej) => {
            const transaction = await sequelize.transaction();
            try {
                if (address.default) {
                    const existingDefault = await new AddressPersistor().getByDefaultAddress(userId);
                    if (existingDefault.id) {
                        await new AddressPersistor().updateDefault(existingDefault.id, false, transaction);
                    } else return rej(new ApiError(`Error on fetching existing default address`, StatusCodes.INTERNAL_SERVER_ERROR))
                }
                const addressInfo = await new AddressPersistor().update(id, address, transaction);
                await transaction.commit();
                res(addressInfo);
            } catch (err) {
                await transaction.rollback();
                rej(err)
            }
        })
    }

    async deleteAddress(id: string): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new AddressPersistor().delete(id);
                res(addressInfo);
            } catch (err) {
                rej(err)
            }
        })
    }

    async deleteAddressByUser(userId: string, transaction?: Transaction): Promise<number> {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new AddressPersistor().delete(userId);
                res(addressInfo);
            } catch (err) {
                rej(err)
            }
        })
    }

    validatorAddressBody(address: Address) {
        const missingAttributes = []
        if (!address.addressType) {
            missingAttributes.push("addressType")
        }
        if (!address.street) {
            missingAttributes.push("street")
        }
        if (!address.city) {
            missingAttributes.push("city")
        }
        if (!address.state) {
            missingAttributes.push("state")
        }
        if (!address.country) {
            missingAttributes.push("country")
        }
        if (!address.zip) {
            missingAttributes.push("zip")
        }
        if (!address.user?.id) {
            missingAttributes.push("user id")
        }
        return missingAttributes
    }
}

