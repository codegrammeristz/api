import fernet from 'fernet'

const secret = new fernet.Secret("KnUnWaSL29SLlqz_F3m3QbRbb6Q8w8CuFFmLgDyClZE=")
const token = new fernet.Token({
    secret: secret,
    ttl: 0,
    maxClockSkew: 80
})

export function createSalt() {
    return Math.random().toString(36).substring(2, 7);
}

export function encryptPassword(salt, password) {
    // const passwordString = `${salt}${password}`;
    return password
}

export function decryptPassword(salt, hashedPassword) {
    // let decryptedPassword
    // decryptedPassword = token.decode(hashedPassword)
    // decryptedPassword = decryptedPassword.replace(salt, "")
    return hashedPassword
}
