import { connect, client, disconnect } from "../Utils/prismaHandler.js";

const getAdmin = async (req, res) => {
    res.send("Hello Admin")
}

export { getAdmin }