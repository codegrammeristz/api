import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {keyExcluder} from "../Utils/keyExcluder.js";
import {supabase} from "../Utils/supabaseClient.js";
import {createSalt, decryptPassword, encryptPassword} from "../Utils/security.js";

const getAllCustomer = async (req, res) => {
    await connect()

    let optimizedCustomers = []

    const customers = await client.Customer.findMany()

    customers.forEach(customer => {
        const optimizedCustomerDetails = keyExcluder(
            customer,
            "customer_password_salt", "customer_password_hash"
        )

        optimizedCustomers.push(optimizedCustomerDetails)
    })

    res.status(200).json({
        customers: optimizedCustomers
    })

    await disconnect()
}

const getSingleCustomer = async (req, res) => {
    await connect()

    const customer = await client.Customer.findUnique({
        where: {
            customer_email: req.params.email
        }
    })

    const optimizedCustomerDetails = keyExcluder(
        customer,
        "customer_password_salt", "customer_password_hash"
    )

    res.status(200).json({
        customerDetails: optimizedCustomerDetails
    })

    await disconnect()
}

const createCustomer = async (req, res) => {
    await connect()

    const {customerFirstName, customerLastName, customerEmail, customerPassword, customerGcashName, customerGcashNumber, customerIsActive} = req.body;
    const salt = createSalt()

    let {user, error} = await supabase.auth.signUp({
        email: customerEmail,
        password: customerPassword
    })

    try {
        if (error != null) {
            res.status(401).json({
                message: "Cannot Create Account"
            })
        } else {
            const customer = await client.Customer.create({
                data: {
                    customer_first_name: customerFirstName,
                    customer_last_name: customerLastName,
                    customer_email: customerEmail,
                    customer_password_salt: salt,
                    customer_gcash_name: customerGcashName.toUpperCase(),
                    customer_gcash_number: customerGcashNumber,
                    customer_password_hash: encryptPassword(salt, customerPassword),
                    customer_is_active: customerIsActive
                }
            })
            res.status(201).json({
                message: "Customer created successfully",
                accountDetails: user,
                customer: customer,
                error: 0
            })
        }
    } catch (e) {
        res.status(401).json({
            message: "Cannot Create Account"
        })
    }

    await disconnect()
}

const updateCustomer = async (req, res) => {
    await connect()

    const {customerFirstName, customerLastName, customerEmail, customerPassword, customerGcashName, customerGcashNumber, customerIsActive} = req.body;
    const salt = createSalt()


    await supabase.auth.signIn({
        email: req.params.email,
        password: customerPassword
    })

    const { user, error } = await supabase.auth.update({
        email: customerEmail,
        password: customerPassword,
    })

    const customer = await client.Customer.update({
        where: {
            customer_email: req.params.email
        },
        data: {
            customer_first_name: customerFirstName,
            customer_last_name: customerLastName,
            customer_email: customerEmail,
            customer_password_salt: salt,
            customer_gcash_name: customerGcashName,
            customer_gcash_number: customerGcashNumber,
            customer_password_hash: encryptPassword(salt, customerPassword),
            customer_is_active: customerIsActive
        }
    })

    await supabase.auth.signOut()

    res.status(200).json({
        message: "Customer updated successfully",
        accountDetails: user,
        customer: customer
    })

    await disconnect()
}

const getCustomerForAuth = async (req, res) => {
    await connect()

    const customer = await client.Customer.findUnique({
        where: {
            customer_email: req.params.email
        }
    })

    let decryptedCustomer = {
        ...customer,
        customer_password: decryptPassword(customer.customer_password_salt, customer.customer_password_hash)
    }

    keyExcluder(
        decryptedCustomer,
        "customer_password_salt", "customer_password_hash"
    )

    res.status(200).json({
        customerDetails: decryptedCustomer
    })

    await disconnect()
}

const loginCustomer = async (req, res) => {
    await connect()

    const {customerEmail, customerPassword} = req.body

    const { user, session, error } = await supabase.auth.signIn({
        email: customerEmail,
        password: customerPassword
    })

    const customer = await client.Customer.findUnique({
        where: {
            customer_email: customerEmail
        }
    })

    try {
        if (error != null) {
            res.status(401).json({
                message: "Invalid credentials"
            })
        } else {
            res.status(200).json({
                message: "Customer logged in successfully",
                accountDetails: user,
                session: session,
                customer
            })
        }
    } catch (e) {
        console.log(e)
    }

    await disconnect()
}

export {getAllCustomer, getSingleCustomer, createCustomer, updateCustomer, getCustomerForAuth, loginCustomer}