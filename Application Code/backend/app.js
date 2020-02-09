const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const path = require("path");

const app = express();

mongoose.connect("mongodb+srv://beckysoren:" + process.env.MONGO_ATLAS_PASS + "@cluster0-aowj6.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(() => {
        console.log('Connection failed!');
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/files", express.static(path.join(__dirname, "/files")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    next();
});


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend for LOR"
    })
})

app.use("/api/user", userRoute);

module.exports = app;