import {connect, client, disconnect} from "../Utils/prismaHandler.js";

const getAllProduct = async (req, res) => {
    await connect()

    const products = await client.Product.findMany()

    res.status(200).json({
        products
    })

    await disconnect()
}

const getSingleProduct = async (req, res) => {
    await connect()

    const product = await client.Product.findUnique({
        where: {
            product_code: req.params.id
        }
    })

    res.status(200).json({
        product
    })

    await disconnect()
}

const createProduct = async (req, res) => {
    await connect()

    const {
        productCode,
        productName,
        productDescription,
        productPrice,
        productImage,
        productIsActive,
        productType,
    } = req.body;

    await client.Product.create({
        data: {
            product_code: productCode,
            product_name: productName,
            product_description: productDescription,
            product_price: productPrice,
            product_image_link: productImage,
            product_is_active: productIsActive,
            product_type: productType
        }
    })

    res.status(201).json({
        message: "Product created successfully",
    })

    await disconnect()
}

const updateProduct = async (req, res) => {
    await connect()

    await disconnect()
}

export {getAllProduct, getSingleProduct, createProduct, updateProduct}