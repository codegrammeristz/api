import { PrismaClient } from '@prisma/client'

const client = new PrismaClient({
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
    ],
    errorFormat: 'pretty'
})

client.$on('warn', (e) => {
    console.log(e)
})

client.$on('info', (e) => {
    console.log(e)
})

client.$on('error', (e) => {
    console.log(e)
})

const connect = async () => {
    await client.$connect()
}

const disconnect = async ()  => {
    await client.$disconnect()
}

export { client, connect, disconnect }