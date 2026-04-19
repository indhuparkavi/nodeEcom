import { StatusCodes } from "http-status-codes";
import ApiError from "../../common/entitys";
import { AddressPersistor } from "../data/persistor";
import { Address } from "../entity";


export class AddressManagement {
    // async addresses(): Promise<Address[]> {
    //     return new Promise(async (res, rej) => {
    //         try {
    //             const address = new AddressPersistor().get()
    //             res(address);
    //         } catch (err) {
    //             rej(err)
    //         }
    //     })
    // }

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
                if (err?.length) {
                    return rej(new ApiError(`Bad Request, missing attributes are ${err.join(',')}`, StatusCodes.BAD_REQUEST))
                }
                const addressInfo = new AddressPersistor().create(address)
                res(addressInfo);
            } catch (err) {
                rej(err)
            }
        })
    }

    async updateAddress(id: string, address: Address): Promise<string> {
        return new Promise(async (res, rej) => {
            try {
                const addressInfo = new AddressPersistor().update(id, address);
                res(addressInfo);
            } catch (err) {
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

    async deleteAddressByUser(userId: string): Promise<number> {
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

