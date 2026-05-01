export enum Role {
    customer = "customer",
    admin = "admin",
    seller = "seller"
}

enum Resource {
    user = "users",
    auth = "auth",
    profile = "profiles",
    address = "addresses",
    category = "categories",
    subCategory = "subCategories",
    product = "products",
    order = "orders",
    invoice = "invoices",
    payment = "payments",
    delivery = "deliveries",
    role = "roles"
}

enum Method {
    create = "create",
    update = "update",
    get = "get",
    delete = "delete",
}


export const permissions = [
    {
        role: Role.customer,
        resources: [
            {
                resource: Resource.user,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                ]
            },
            {
                resource: Resource.auth,
                authorize: [
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.profile,
                authorize: [
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                ]
            },
            {
                resource: Resource.address,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.product,
                authorize: [
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.get,
                    },
                ]
            },
            {
                resource: Resource.order,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.payment,
                authorize: [
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.delivery,
                authorize: [
                    {
                        name: Method.get
                    }
                ]
            },
            {
                resource: Resource.invoice,
                authorize: [
                    {
                        name: Method.get
                    }
                ]
            },

        ]
    },
    {
        role: Role.seller,
        resources: [
            {
                resource: Resource.user,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                ]
            },
            {
                resource: Resource.auth,
                authorize: [
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.profile,
                authorize: [
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                ]
            },
            {
                resource: Resource.address,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.product,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.order,
                authorize: [
                    {
                        name: Method.get,
                    },
                ]
            },
            {
                resource: Resource.invoice,
                authorize: [
                    {
                        name: Method.get
                    }
                ]
            },
            {
                resource: Resource.payment,
                authorize: [
                    {
                        name: Method.get
                    }
                ]
            },
            {
                resource: Resource.delivery,
                authorize: [
                    {
                        name: Method.get
                    }
                ]
            },
        ]
    },
    {
        role: Role.admin,
        resources: [
            {
                resource: Resource.user,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.auth,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.profile,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.address,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.update,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.product,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.order,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create
                    }
                ]
            },
            {
                resource: Resource.payment,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.delivery,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },
            {
                resource: Resource.invoice,
                authorize: [
                    {
                        name: Method.delete,
                    },
                    {
                        name: Method.get,
                    },
                    {
                        name: Method.create,
                    },
                    {
                        name: Method.update,
                    },
                ]
            },

        ]
    },
]