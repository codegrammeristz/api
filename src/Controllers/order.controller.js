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

const updateOrderStatus = async (req, res) => {
    await connect()

    const {orderStatus} = req.body;

    const order = await client.Order.update({
        where: {
            order_number: parseInt(req.params.id)
        },
        data: {
            order_status: orderStatus
        }
    })

    res.status(200).json({
        message: "Order status updated successfully",
    })

    await disconnect()
}

const getRevenue = async (req, res) => {
    await connect()

    let today = new Date()
    let oneWeekLater = today.setDate(today.getDate() + 7)

    const weekRevenue = await prisma.$queryRaw`
        SELECT 
    `

    const dayRevenue = await client.Order.aggregate({
        _sum: {
            order_price: true
        }
    })

    await disconnect()
}

export {getAllOrder, getSingleOrder, createOrder, updateOrderStatus, getRevenue}