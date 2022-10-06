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
            order_number: parseInt(req.params.id)
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

    const dayRevenueTotal = await client.$queryRaw`
        SELECT
            COALESCE(SUM(p.product_price * o.order_quantity), 0) as revenue
        FROM "order" o JOIN product p ON o.order_product_code=p.product_code
        WHERE o.order_status = 4
          AND o.order_date::date = CURRENT_DATE;
    `

    const weeklyRevenueTotal = await client.$queryRaw`
    SELECT
        COALESCE(SUM(p.product_price * o.order_quantity), 0) as weekly_revenue
    FROM "order" o JOIN product p on o.order_product_code = p.product_code
    WHERE o.order_status = 4
      AND o.order_date::date
      BETWEEN '2022-10-02'::date AND '2022-10-08'::date
    `

    res.status(200).json({
        dayRevenue: dayRevenueTotal[0].revenue,
        weeklyRevenue: weeklyRevenueTotal[0].weekly_revenue
    })

    await disconnect()
}

export {getAllOrder, getSingleOrder, createOrder, updateOrderStatus, getRevenue}