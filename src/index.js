const express = require("express");
const dotenv = require("dotenv")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express()

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

app.get("/api", (req, res) => {
   res.send("Test"); 
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        }
    });

    res.send({
       data: product,
       message: "Create product success" 
    });
});

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id

    await prisma.product.delete({
        where: {
            id: parseInt(productId),   
        },
    });

    res.send("Product Deleted")
});

app.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (
        !(
            productData.name &&
            productData.price &&
            productData.description &&
            productData.image 
        )
    ) {
        return res.status(400).send("gagal");
    }

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            name: productData.name,
                price: productData.price,
                description: productData.description,
                image: productData.image,
            }
        });
        
        res.send({
            data: product,
            message: "edit data successful"
        })
});

app.patch("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            name: productData.name,
                price: productData.price,
                description: productData.description,
                image: productData.image,
            }
        });
        
        res.send({
            data: product,
            message: "edit data successful"
        })
});

app.listen(PORT, () => {
    console.log("Running on port : " + PORT);
});