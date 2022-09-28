import {connect, client, disconnect} from "../Utils/prismaHandler.js";

const getAllOrder = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany()

    res.status(200).json({
        orders
    })

    await disconnect()
}

const getSingleOrder = async (req, res) => {
    await connect()

    const order = await client.Order.findUnique({
        where: {
            order_number: req.params.id
        }
    })

    res.status(200).json({
        order
    })

    await disconnect()
}

const createOrder = async (req, res) => {
    await connect()

    // get order customer email from session
    const {
        orderProductCode,
        orderCustomerEmail,
        orderRequests,
        orderStaffUsername,
        orderQuantity,
        orderStatus
    } = req.body;

    await client.Order.create({
        data: {
            order_product_code: orderProductCode,
            order_customer_email: orderCustomerEmail,
            order_requests: orderRequests,
            order_date: new Date(),
            order_staff_username: orderStaffUsername,
            order_quantity: orderQuantity,
            order_status: orderStatus
        }
    })

    res.status(201).json({
        message: "Order created successfully",
    })

    await disconnect()
}

const updateOrder = async (req, res) => {
    await connect()

    await disconnect()
}

export {getAllOrder, getSingleOrder, createOrder, updateOrder}