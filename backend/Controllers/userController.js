const { set } = require('mongoose');
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
            res.redirect("http://localhost:3000/login");
        }else{
            res.status(500).send({message:"Something went wrong"});
        }
    }

};

const findUser = async(req,res) =>{
    if(req.body){
        const {username, email} = req.body;
        const params = username ?? email;
        if(params){
            const findedUser = await User.findOne({userName:params});
            if(findedUser){
                res.status(200).send({user:findedUser});
            }else{
                res.status(404).send({message:"User not found"})
            }
        }
    }
}

const validateUser = async (req, res) => {
    if (req.body) {
        console.log("req.body =>", req.body);
        const { username, password } = req.body;
        console.log("username =>", username);

        const findUser = await User.findOne({userName:username});
        console.log(findUser);
        if (findUser) {
            const validatePass = await bcrypt.compare(password, findUser.password)
            if (validatePass) {
                res.status(200).send({redirectUrl : "http://localhost:3000/"})
            } else {
                console.log("wrong details");
            }
        }else{
            res.status(404).send({message:"user not found"})
        }
    }
    res.end()
}

const resetPassword = async (req,res)=>{
    console.log("request body =>",req.body);
    if(req.body){
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const updatedUser = await User.findOneAndUpdate({email},{$set:{password:hashedPassword}},{new:true})
        if(updatedUser){
            console.log("updated user =>", updatedUser);
            res.status(200).send({user:updatedUser});
        }else{
            res.status(404).send({message:"Something went wrong"});
        }
    }      

    res.end();
}

const searchUsers = async (req,res) =>{
    console.log(req.body);
    if(req.body){
        const { searchString } = req.body;
        const query = 
            {
                $or : [
                    {name : {$regex : searchString, $options: 'i'}},
                    {userName : {$regex: searchString, $options : 'i'}}
                ]
            }

        const userLists = await User.find(query);    
        if(userLists.length > 0 ){
            res.status(200).send({userList:userLists});
        }
    }
}

module.exports = {
    registerUser,
    validateUser,
    resetPassword,
    searchUsers
}