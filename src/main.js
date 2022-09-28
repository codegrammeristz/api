import express from "express"
import cors from "cors"

// app routes
import {adminRoutes} from "./Routes/admin.routes.js"
import {customerRoutes} from "./Routes/customer.routes.js"
import {orderRoutes} from "./Routes/order.routes.js"
import {productRoutes} from "./Routes/product.routes.js"
import {staffRoutes} from "./Routes/staff.routes.js"
import {transactionRoutes} from "./Routes/transaction.routes.js"

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