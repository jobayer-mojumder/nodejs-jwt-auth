require('dotenv').config()
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router')

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Welcome to the application')
    res.status(200).json({
        message: "Welcome to the application"
    });
})

app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});