const User = require('../Models/UserModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    console.log("req body =>", req.body)
    if (req.body) {
        let { name, lastName, email, password, userName } = req.body;
        if (password.length > 0) {
            password = await bcrypt.hash(password, 10);
        }


        const newUser = {
            name,
            lastName,
            userName,
            email,
            password
        }


        const addUser = await new user(newUser).save();
        if (addUser) {
            console.log('user added successfully');
        }
    }
    res.status(200).end();
};

const validateUser = async (req, res) => {
    if (req.body) {
        console.log("req.body =>", req.body);
        const { userName, password } = req.body;

        const findUser = await User.findOne({ userName });
        if (findUser) {
            const validatePass = await bcrypt.compare(password, findUser.password)

            if (validatePass) {
                console.log("pass valid");
                res.status(200).send("Validated");
            } else {
                console.log("wrong details");
            }
        }
    }
    res.end()
}

module.exports = {
    registerUser,
    validateUser
}