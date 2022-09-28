import {connect, client, disconnect} from "../Utils/prismaHandler.js";
import {keyExcluder} from "../Utils/keyExcluder.js";
import {createSalt, decryptPassword, encryptPassword} from "../Utils/security.js";

const getAllStaff = async (req, res) => {
    await connect()

    let optimizedStaffs = []
    const staffs = await client.Staff.findMany()

    staffs.forEach(staff => {
        const optimizedStaffDetails = keyExcluder(
            staff,
            "staff_password_salt", "staff_password_hash"
        )

        optimizedStaffs.push(optimizedStaffDetails)
    })

    res.status(200).json({
        staffs: optimizedStaffs
    })

    await disconnect()
}

const getSingleStaff = async (req, res) => {
    await connect()

    const staff = await client.Staff.findUnique({
        where: {
            staff_id: req.params.id
        }
    })

    const optimizedStaffDetails = keyExcluder(
        staff,
        "staff_password_salt", "staff_password_hash"
    )

    res.status(200).json({
        staffDetails: optimizedStaffDetails
    })

    await disconnect()
}

const createStaff = async (req, res) => {
    await connect()

    const {staffFullName, staffContactNumber, staffUsername, staffPassword, staffPosition, staffIsActive} = req.body;
    const salt = createSalt()

    await client.Staff.create({
        data: {
            staff_full_name: staffFullName,
            staff_contact_number: staffContactNumber,
            staff_username: staffUsername,
            staff_password_salt: salt,
            staff_password_hash: encryptPassword(salt, staffPassword),
            staff_position: staffPosition,
            staff_is_active: staffIsActive
        }
    })

    await disconnect()
}

const updateStaff = async (req, res) => {
    await connect()

    const {staffFullName, staffContactNumber, staffUsername, staffPassword, staffPosition, staffIsActive} = req.body;
    const salt = createSalt()

    await client.Staff.update({
        where: {
            staff_id: req.params.id
        },
        data: {
            staff_full_name: staffFullName,
            staff_contact_number: staffContactNumber,
            staff_username: staffUsername,
            staff_password_salt: salt,
            staff_password_hash: encryptPassword(salt, staffPassword),
            staff_position: staffPosition,
            staff_is_active: staffIsActive
        }
    })

    await disconnect()
}

const getStaffForAuth = async (req, res) => {
    await connect()

    const staff = await client.Staff.findUnique({
        where: {
            staff_username: req.params.username
        }
    })

    let decryptedStaff = {
        ...staff,
        staff_password: decryptPassword(staff.staff_password_salt, staff.staff_password_hash)
    }

    res.status(200).json({
        staffDetails: decryptedStaff
    })

    await disconnect()
}

export {getAllStaff, getSingleStaff, createStaff, updateStaff, getStaffForAuth}