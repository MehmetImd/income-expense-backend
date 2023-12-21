const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    incomes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income'
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
