import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {createSalt, decryptPassword, encryptPassword} from "../Utils/security.js";
import {keyExcluder} from "../Utils/keyExcluder.js";

const getAllAdmin = async (req, res) => {
    await connect()

    let optimizedAdmins = []

    const admins = await client.Admin.findMany()

    admins.forEach(admin => {
        const optimizedAdminDetails = keyExcluder(
            admin,
            "admin_password_salt", "admin_password_hash"
        )

        optimizedAdmins.push(optimizedAdminDetails)
    })

    res.status(200).json({
        admins: optimizedAdmins
    })

    await disconnect()
}

const getSingleAdmin = async (req, res) => {
    await connect()

    const admin = await client.Admin.findUnique({
        where: {
            admin_username: req.params.username
        }
    })

    const optimizedAdminDetails = keyExcluder(
        admin,
        "admin_password_salt", "admin_password_hash"
    )

    res.status(200).json({
        adminDetails: optimizedAdminDetails
    })

    await disconnect()
}

const createAdmin = async (req, res) => {
    await connect()

    const {adminFullName, adminUsername, adminPassword, adminIsActive, adminIsSuperadmin} = req.body;
    const salt = createSalt()

    await client.Admin.create({
        data: {
            admin_full_name: adminFullName,
            admin_username: adminUsername,
            admin_password_salt: salt,
            admin_password_hash: encryptPassword(salt, adminPassword),
            admin_is_active: adminIsActive,
            admin_is_superadmin: adminIsSuperadmin
        }
    })

    res.status(201).json({
        message: "Admin created successfully",
    })

    await disconnect()
}

const updateAdmin = async (req, res) => {
    await connect()

    const {adminFullName, adminUsername, adminPassword, adminIsActive, adminIsSuperadmin} = req.body;
    const salt = createSalt()

    const admin = await client.Admin.update({
        where: {
            admin_username: req.params.username
        },
        data: {
            admin_full_name: adminFullName,
            admin_username: adminUsername,
            admin_password_salt: salt,
            admin_password_hash: encryptPassword(salt, adminPassword),
            admin_is_active: adminIsActive,
            admin_is_superadmin: adminIsSuperadmin
        }
    })

    res.status(200).json({
        message: "Admin updated successfully",
        admin: admin
    })

    await disconnect()
}

const getAdminForAuth = async (req, res) => {
    await connect()

    try {
        const admin = await client.Admin.findUnique({
            where: {
                admin_username: req.params.username
            }
        })
        res.status(200).json({
            adminDetails: {...admin, admin_password: admin.admin_password_hash}
        })
    } catch (e) {
        res.status(400).json({
            message: "Admin not found"
        })
    }

    // let decryptedAdmin = {
    //     ...admin,
    //     admin_password: decryptPassword("", admin.admin_password_hash)
    // }

    // keyExcluder(
    //     decryptedAdmin,
    //     "admin_password_salt", "admin_password_hash"
    // )



    await disconnect()
}

export {getAllAdmin, getSingleAdmin, createAdmin, updateAdmin, getAdminForAuth}