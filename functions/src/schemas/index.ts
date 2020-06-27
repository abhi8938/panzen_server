import * as Joi from "joi";import * as jwt from "jsonwebtoken";import * as functions from 'firebase-functions';const locationSchema = Joi.object().keys({    lat: Joi.number().required(),    long: Joi.number().required(),    address: Joi.string().required(),    city: Joi.string().required(),    State: Joi.string().required(),    Country: Joi.string().required(),    PinCode: Joi.number().required(),    CountryCode: Joi.string().required().uppercase()});export const validateAuth = function (body: any) {    const Schema = Joi.object().keys({        email: Joi.string().min(5).required().email(),        password: Joi.string().min(5).max(255).required(),        role: Joi.string().required()    });    return Joi.validate(body, Schema);};export const validateReset = function (body: any) {    const Schema = Joi.object().keys({        email: Joi.string().min(5).required().email(),        role: Joi.string().required()    });    return Joi.validate(body, Schema);};export const generateAuthToken = function (user: { id: string, role: string }) {    const secretKey = functions.config().authkey.key;    return jwt.sign(user, secretKey);};export const validateRestaurant = function (body: any) {    const schema = Joi.object().keys({        name: Joi.string().required(),        email: Joi.string().min(5).required().email(),        ownerID: Joi.string().required(),        subscription: {            packageName: Joi.string().required(),            startDate: Joi.date().required(),            endDate: Joi.date().required()        },        contactNumber: Joi.string().required().min(10).max(10),        officeLocation: locationSchema,        branches: Joi.alternatives(Joi.array().items(Joi.string()), Joi.number())    });    return Joi.validate(body, schema);};export const validateOwner = function (body: any) {    const ownerSchema = Joi.object().keys({        fullName: Joi.string().required(),        contactNumber: Joi.string().required().min(10).max(10),        email: Joi.string().min(5).required().email(),        password: Joi.string().min(5).max(255).required(),        alternateEmail: Joi.string().min(5).required().email(),        alternateContactNumber: Joi.string().required().min(10).max(10),        location: locationSchema,        restaurantID: Joi.string().required()    });    return Joi.validate(body, ownerSchema);};export const validateCustomer = function (body: any) {    const ownerSchema = Joi.object().keys({        fullName: Joi.string().required(),        contactNumber: Joi.string().required().min(10).max(10),        email: Joi.string().min(5).required().email(),        password: Joi.string().min(5).max(255).required(),    });    return Joi.validate(body, ownerSchema);};export const validateBranch = function (body: any) {    const managerSchema = Joi.object().keys({        fullName: Joi.string().required(),        email: Joi.string().min(5).required().email(),        password: Joi.string().min(5).max(255).required(),        ownerID: Joi.string().required(),        restaurantID: Joi.string().required(),        branchID: Joi.string().required(),        profilePic: Joi.string().required(),        contactNumber: Joi.string().required().min(10).max(10)    });    const schema = Joi.object().keys({        branchName: Joi.string().required(),        location: locationSchema,        email: Joi.string().min(5).required().email(),        contactNumber: Joi.string().required().min(10).max(10),        restaurantID: Joi.string().required(),        manager: managerSchema,        ownerID: Joi.string().required(),        type: Joi.string().required(),        employees: Joi.alternatives(Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            designation: Joi.string().required()        })), Joi.string()).required(),        items: Joi.alternatives(Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            category: Joi.string().required()        })), Joi.string()).required(),        combos: Joi.alternatives(Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            category: Joi.string().required()        })), Joi.string()).required(),        inventory: Joi.alternatives(Joi.array().items(Joi.string().required()), Joi.string()).required(),        customers: Joi.alternatives(Joi.array().items(Joi.string().required()), Joi.string()).required()    });    return Joi.validate(body, schema);};export const validateEmployee = function (body: any) {    const schema = Joi.object().keys({        fullName: Joi.string().required(),        gender: Joi.string().required(),        email: Joi.string().min(5).required().email(),        password: Joi.string().min(5).max(255).required(),        branchID: Joi.string().required(),        profilePic: Joi.string().required(),        accountDetails: Joi.object().keys({            name: Joi.string().required(),            bankName: Joi.string().required(),            number: Joi.string().required(),            ifsc: Joi.string().required(),            gst: Joi.string().required()        }),        payScale: Joi.object().keys({            price: Joi.number().required(),            scale: Joi.string().required()        }),        address: Joi.string().required(),        contactNumber: Joi.string().required().min(10).max(10),        designation: Joi.string().required(),        rating: Joi.number(),        workingHours: Joi.number().default(0),        employementType: Joi.string().required()    });    return Joi.validate(body, schema);};export const validateReservation = function (body: any) {    const schema = Joi.object().keys({        customerName: Joi.string().required(),        customerContact: Joi.string().required().min(10).max(10),        branchID: Joi.string().required(),        reservationDate: Joi.date().required(),        reservationTime: Joi.date().required(),        totalGuests: Joi.string().required().default(1),    });    return Joi.validate(body, schema);};export const validateItem = function (body: any) {    const schema = Joi.object().keys({        name: Joi.string().required(),        category: Joi.object().keys({            name: Joi.string().required(),            icon: Joi.string().required(),        }).required(),        branchID: Joi.string().required(),        ratings: Joi.number().required(),        availability: Joi.boolean().required().default(true),        price: Joi.number().required(),        description: Joi.string().required(),        favorite: Joi.boolean().required().default(false),        itemImage: Joi.string().required()    });    return Joi.validate(body, schema);};export const validateTable = function (body: any) {    const schema = Joi.object().keys({        branchID: Joi.string().required(),        number: Joi.number().required(),        capacity: Joi.number().required(),        status: Joi.string().valid('ACTIVE', 'INACTIVE', 'RESERVED'),        captainAssigned: Joi.alternatives(Joi.string().default('NO-CAPTAIN'), Joi.object().keys({            id: Joi.string(),            name: Joi.string()        })),        maintenance: Joi.boolean().required(),        onGoingReservation: Joi.string().default('NO-ONGOING-RESERVATION'),        orders: Joi.array().items(Joi.string()).default('NO-ORDERS'),        onGoingOrders: Joi.array().items(Joi.string()).default('NO-ONGOING-ORDERS'),    });    return Joi.validate(body, schema);};export const validateCombos = function (body: any) {    const schema = Joi.object().keys({        branchID: Joi.string().required(),        name: Joi.string().required(),        items: Joi.array().items({name: Joi.string(), id: Joi.string()}).required(),        description: Joi.string().required(),        rating: Joi.number().required(),        price: Joi.number().required(),        status: Joi.string().valid('ACTIVE', "INACTIVE")    });    return Joi.validate(body, schema);};export const validateOnlineOrder = function (body: any) {    const schema = Joi.object().keys({        branchID: Joi.string().required(),        customer: Joi.object().keys({            name: Joi.string().required(),            location: Joi.string().required(),            contactNumber: Joi.string().required().min(10).max(10),            email: Joi.string().min(5).required().email(),        }),        items: Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required(),            quantity: Joi.number().required()        })).required(),        value: Joi.number().required(),        status: Joi.string().default('ACTIVE')    });    return Joi.validate(body, schema);};export const validateOrder = function (body: any) {    const schema = Joi.object().keys({        branchID: Joi.string().required(),        customer: Joi.object().keys({            name: Joi.string().required(),            contactNumber: Joi.string().required().min(10).max(10),        }),        items: Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required(),            quantity: Joi.number().required()        })).required(),        value: Joi.number().required(),        status: Joi.string().valid('ACTIVE', 'SERVED', 'CANCELLED'),        tableNumber: Joi.number().required()    });    return Joi.validate(body, schema);};export const validateSupplier = function (body: any) {    const supplierSchema = Joi.object().keys({        fullName: Joi.string().required(),        contactNumber: Joi.string().required().min(10).max(10),        email: Joi.string().min(5).required().email(),        rawItems: Joi.array().items(Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        })).required(),        branchID: Joi.string().required(),        method: Joi.string().required(),        accountDetails: Joi.alternatives(Joi.object().keys({            name: Joi.string(),            bankName: Joi.string(),            number: Joi.string(),            ifsc: Joi.string(),            gst: Joi.string()        }), Joi.empty(Joi.object().keys({})))    });    return Joi.validate(body, supplierSchema);};export const validateCategory_unit = function (body: any) {    const category_unitSchema = Joi.object().keys({        name: Joi.string().required(),        branchID: Joi.string().required(),        defaultBool: Joi.boolean().required()    });    return Joi.validate(body, category_unitSchema);};export const validateMenuCategory = function (body: any) {    const category_unitSchema = Joi.object().keys({        name: Joi.string().required(),        branchID: Joi.string().required(),        icon: Joi.string().required(),    });    return Joi.validate(body, category_unitSchema);};export const validateStorage = function (body: any) {    const storageSchema = Joi.object().keys({        name: Joi.string().required(),        branchID: Joi.string().required(),        cleaningSchedule: Joi.string().required(),        lastClean: Joi.date().required(),        employeeInCharge: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        })    });    return Joi.validate(body, storageSchema);};export const validateWastage = function (body: any) {    const storageSchema = Joi.object().keys({        item: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        branchID: Joi.string().required(),        type: Joi.string().required(),        reason: Joi.string().required(),        employeeInCharge: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        units: Joi.number().required(),        UOM: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }).required()    });    return Joi.validate(body, storageSchema);};export const validateExpense = function (body: any) {    const expenseSchema = Joi.object().keys({        items: Joi.array().items({            name: Joi.string().required(),            quantity: Joi.string().required(),            price: Joi.number().required()        }),        period: Joi.string().required(),        branchID: Joi.string().required(),        type: Joi.string().required(),        comments: Joi.string(),        paymentStatus: Joi.string().required(),        billAmount: Joi.number().required(),        employeeIncharge: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        category: Joi.string().required()    });    return Joi.validate(body, expenseSchema);};export const validateExpenseCategory = function (body: any) {    const schema = Joi.object().keys({        name: Joi.string().required(),        branchID: Joi.string().required(),    });    return Joi.validate(body, schema);};export const validateInventoryItem = function (body: any) {    const schema = Joi.object().keys({        name: Joi.string().required(),        category: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        branchID: Joi.string().required(),        UOM: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        pricePerUnit: Joi.number().required(),        storage: Joi.object().keys({            id: Joi.string().required(),            name: Joi.string().required()        }),        UIH: Joi.number().required(),        life: Joi.number().required(),        totalCost: Joi.number().required(),    });    return Joi.validate(body, schema);};