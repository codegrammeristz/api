import { connect, client, disconnect } from "../Utils/prismaHandler.js";

const getAllTransaction = async (req, res) => {
    await connect()

    const transactions = await client.Transactions.findMany()

    res.status(200).json({
        transactions
    })

    await disconnect()
}


const createTransaction = async (req, res) => {
    await connect()

    await disconnect()
}

export { getAllTransaction, createTransaction }