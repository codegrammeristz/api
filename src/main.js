import express from "express"
import cors from "cors"

// app routes
import {adminRoutes} from "./Routes/admin.routes.js"
import {customerRoutes} from "./Routes/customer.routes.js"
import {orderRoutes} from "./Routes/order.routes.js"
import {productRoutes} from "./Routes/product.routes.js"
import {staffRoutes} from "./Routes/staff.routes.js"
import {transactionRoutes} from "./Routes/transaction.routes.js"
import {client, connect, disconnect} from "./Utils/prismaHandler.js";

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`)
})

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

app.use("/api/admin", adminRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/product", productRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/transaction", transactionRoutes)

app.get("/api/meta/rowCount", async (req, res) => {
    await connect()

    const customer = await client.Customer.count()
    const staff = await client.Staff.count()
    const product = await client.Product.count()
    const order = await client.Order.count()
    const admin = await client.Admin.count()

    res.status(200).json({
        customer: customer,
        staff: staff,
        product: product,
        order: order,
        admin: admin
    })

    await disconnect()
})