const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let users = []; 


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {
    const { name, email, password } = req.body;

    let errors = {};

    if (!name) errors.name = "Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = "Valid email is required.";
    if (!password || password.length < 6) errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
    } else {
        users.push({ name, email, password });
        res.send("Registration successful!");
    }
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(3100, () => console.log("Server running "));
