require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
//const loginRouter = require('./api/users/user.controller');
//const productRouter = require('./api/product/product.router');
//const orderRouter = require('./api/order/order.router');
//const inventoryRouter = require('./api/inventory/inventory.router');

app.use(express.json());

app.use("/api/users", userRouter);
//app.use("/api/login", userRouter);
//app.use("/api/product", productRouter);
//app.use("/api/order", orderRouter);
//app.use("/api/inventory", inventoryRouter);


const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`);
});