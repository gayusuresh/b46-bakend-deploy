const express = require("express");
require("dotenv").config();
const cors=require("cors")
const productRouter = require("./router/ProductRouter")
const authRouter = require("./router/authRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/auth", authRouter);

const dbConnection = require("./config/dbConnection.config");
dbConnection();
app.listen(process.env.port, () => {
    console.log(`${process.env.port} server running successfully`)
})