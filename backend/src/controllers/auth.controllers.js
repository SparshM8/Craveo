const userModel = require("../models/user.model");

exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;