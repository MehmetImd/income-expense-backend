const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // cookie-parser modülünü ekledim
const {
    db
} = require("./db/db");
const {
    readdirSync
} = require("fs");
const session = require("express-session");
const mongoose = require("mongoose");
const locals = require("./middlewares/locals");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB bağlantısı başarılı.');
    })
    .catch((err) => {
        console.error('MongoDB bağlantısı başarısız:', err);
    });

// Middleware
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
}));
app.use(express.json()); // express.json() middleware'ini en sonda ekledim
app.use(cors());
app.use(locals);

// Router
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/" + route)));

const server = () => {
    db(); // db fonksiyonunu çağır
    app.listen(PORT, () => {
        console.log("Listening to Port:", PORT);
    });
};

server();
