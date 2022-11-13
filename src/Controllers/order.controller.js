import {connect, client, disconnect} from "../Utils/prismaHandler.js";

const getAllOrder = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany({
        orderBy: {
            order_date: "desc"
        }
    })

    res.status(200).json({
        orders
    })

    await disconnect()
}

const getSingleOrder = async (req, res) => {
    await connect()

    const order = await client.Order.findUnique({
        where: {
            order_number: parseInt(req.params.id)
        }
    })

    res.status(200).json({
        order
    })

    await disconnect()
}

//
const createOrder = async (req, res) => {
    await connect()

    let date = new Date()
    date = new Date(date.setHours(date.getHours() + 8))

    // get order customer email from session
    const {
        orderProductCode,
        orderCustomerEmail,
        orderRequests,
        orderStaffUsername,
        orderQuantity,
        orderStatus,
        orderPaymentMethod
    } = req.body;

    const data = await client.Order.create({
        data: {
            order_product_code: orderProductCode,
            order_customer_email: orderCustomerEmail,
            order_requests: orderRequests,
            order_date: date,
            order_staff_username: orderStaffUsername,
            order_quantity: orderQuantity,
            order_status: orderStatus,
            order_payment_method: orderPaymentMethod
        }
    })

    res.status(201).json({
        message: "Order created successfully",
        orderID: data.order_number
    })

    await disconnect()
}

const createBulkOrder = async (req, res) => {
    await connect()

    const {orders} = req.body;

    await client.Order.createMany({
        data: orders
    })

    res.status(201).json({
        message: "Bulk order created successfully",
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
        order: order
    })

    await disconnect()
}

const getTodayOrders = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany({
        where: {
            order_date: {
                gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        },
        orderBy: {
            order_date: "desc"
        }
    })

    res.status(200).json({
        orders
    })

    await disconnect()
}

const getRevenue = async (req, res) => {
    await connect()

    const dayRevenueTotal = await client.$queryRaw`
        SELECT
            COALESCE(SUM(p.product_price * o.order_quantity), 0) as revenue
        FROM "order" o JOIN product p ON o.order_product_code=p.product_code
        WHERE o.order_status = 5
          AND (o.order_date + interval '8 hours')::date = CURRENT_DATE;
    `

    const weeklyRevenueTotal = await client.$queryRaw`
        SELECT
            COALESCE(SUM(p.product_price * o.order_quantity), 0) as weekly_revenue
        FROM "order" o JOIN product p on o.order_product_code = p.product_code
        WHERE o.order_status = 5
          AND (o.order_date + interval '8 hours')::date
          BETWEEN '2022-11-14'::date AND '2022-11-18'::date;
    `

    console.log(dayRevenueTotal, weeklyRevenueTotal)

    res.status(200).json({
        dayRevenue: dayRevenueTotal[0].revenue,
        weeklyRevenue: weeklyRevenueTotal[0].weekly_revenue
    })

    await disconnect()
}

const getFulfilledOrderByEmail = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany({
        where: {
            order_customer_email: req.params.email,
            order_status: 5
        },
        orderBy: {
            order_date: "desc"
        }
    })

    res.status(200).json({
        orders
    })

    await disconnect()
}

const getNotFulfilledOrdersByEmail = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany({
        where: {
            order_customer_email: req.params.email,
            order_status: {
                not: 5
            }
        },
        orderBy: {
            order_date: "desc"
        }
    })

    res.status(200).json({
        orders
    })

    await disconnect()
}

// get fulfilled orders after today
const getPastFulfilledOrders = async (req, res) => {
    await connect()

    const orders = await client.Order.findMany({
        where: {
            order_status: 5,
            order_date: {
                lt: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }
    })

    res.status(200).json({
        orders
    })

    await disconnect()
}

export {
    getAllOrder,
    getSingleOrder,
    createOrder,
    updateOrderStatus,
    getRevenue,
    getFulfilledOrderByEmail,
    getNotFulfilledOrdersByEmail,
    getTodayOrders,
    createBulkOrder,
    getPastFulfilledOrders
}