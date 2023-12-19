const mongoose = require("mongoose");

const db = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    }
    catch(err) {
        console.log("DB Connection Error");
    };
};

module.exports = { db };