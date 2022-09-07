import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const client = new PrismaClient()

const connect = async () => {
    await prisma.$connect()
}

const disconnect = async ()  => {
    await prisma.$disconnect()
}

export { client, connect, disconnect }