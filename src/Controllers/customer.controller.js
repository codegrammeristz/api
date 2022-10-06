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
            customer_id: req.params.email
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

    const {customerFirstName, customerLastName, customerEmail, customerPassword, customerIsActive} = req.body;
    const salt = createSalt()

    let {user, error} = await supabase.auth.signUp({
        email: customerEmail,
        password: customerPassword
    })

    await client.Customer.create({
        data: {
            customer_first_name: customerFirstName,
            customer_last_name: customerLastName,
            customer_email: customerEmail,
            customer_password_salt: salt,
            customer_password_hash: encryptPassword(salt, customerPassword),
            customer_is_active: customerIsActive
        }
    })

    res.status(201).json({
        message: "Customer created successfully",
        user: user
    })

    await disconnect()
}

const updateCustomer = async (req, res) => {
    await connect()
    
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
        customer_password_hash: decryptPassword(customer.customer_password_salt, customer.customer_password_hash)
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

export {getAllCustomer, getSingleCustomer, createCustomer, updateCustomer, getCustomerForAuth}