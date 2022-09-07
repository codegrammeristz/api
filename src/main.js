import express from "express"
import cors from "cors"

// app routes
import {adminRoutes} from "./Routes/admin.routes.js"

const app = express()

app.use(cors())

app.listen(process.env.PORT || 8080)

app.use("/admin", adminRoutes)

