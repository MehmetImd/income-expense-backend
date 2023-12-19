const express = require("express");
const cors = require("cors");
const { db } = require("./db/db.JS");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Router
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log("Listining to Port:", PORT);
    });
};

server();