const { set } = require('mongoose');
const User = require('../Models/UserModel');
const user = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

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
        } else {
            res.status(500).send({ message: "Something went wrong" });
        }
    }

};

const validateUser = async (req, res) => {
    if (req.body) {
        console.log("req.body =>", req.body);
        const { username, password } = req.body;
        console.log("username =>", username);

        const findUser = await User.findOne({ userName: username });
        console.log(findUser);
        if (findUser) {
            const validatePass = await bcrypt.compare(password, findUser.password)
            if (validatePass) {
                res.status(200).send({ redirectUrl: "http://localhost:3000/", user: findUser })
            } else {
                console.log("wrong details");
            }
        } else {
            res.status(404).send({ message: "user not found" })
        }
    }
    res.end()
}

const resetPassword = async (req, res) => {
    console.log("request body =>", req.body);
    if (req.body) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } }, { new: true })
        if (updatedUser) {
            console.log("updated user =>", updatedUser);
            res.status(200).send({ user: updatedUser });
        } else {
            res.status(404).send({ message: "Something went wrong" });
        }
    }

    res.end();
}

const searchUsers = async (req, res) => {
    console.log(req.body);
    if (req.body) {
        const { searchString } = req.body;
        const query =
        {
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { userName: { $regex: searchString, $options: 'i' } }
            ]
        }

        const userLists = await User.find(query);
        if (userLists.length > 0) {
            res.status(200).send({ userList: userLists });
        }
    }
}

const addFriend = async (req, res) => {
    if (req.body) {
        const { userId, from } = req.body;

        const senderUser = await User.findOne({ _id: from });
        const toUser = await user.findOne({ _id: userId });

        // if both users send friend req to each other
        if(toUser.friendRequests.get(senderUser._id)){
            toUser.friendRequests.delete(senderUser._id);
            senderUser.friendRequests.delete(toUser._id);

            senderUser.friendList = new Map();
            senderUser.friendList.set(toUser._id,{
                userId : toUser._id,
                timeStamp : Date.now(),
                message : new Map()
            })

            toUser.friendList = new Map();
            toUser.friendList.set(senderUser._id, {
                userId : senderUser._id,
                timeStamp : Date.now(),
                message: new Map()
            })

            const senderUserSaved = await senderUser.save();
            const toUserSaved = await toUser.save();
            if(senderUserSaved && toUserSaved){
                res.status(200).send({message:"Friends added successfully"});
                return;
            }else{
                res.status(500).send({message:"something went wrong"});
            }
        }

        if (toUser.friendRequests) {
            if (toUser.friendRequests.get(from)) {
                res.status(403).send({ message: "already friends" });
            } else {
                toUser.friendRequests.set(from,  { from: senderUser })
            }
        } else {
            toUser.friendRequests = new Map();
            toUser.friendRequests.set(from, 
                { from: senderUser }
            )
        }

        const userSaved = await toUser.save();
        userSaved && res.status(200).send({ user: userSaved });

    }
}

const handleFriendRequest = async (req, res) =>{
    if(req.body){
        const {isAccepted, from, to} = req.body;
        console.log(req.body);
        const senderUser = await User.findOne({_id : from._id});
        const toUser = await User.findOne({_id: to._id});

        console.log(senderUser);
        if(isAccepted){
            console.log("sender user =>", senderUser);
            toUser.friendRequests.delete(senderUser._id);
            senderUser.friendRequests && senderUser.friendRequests.delete(toUser._id);

            console.log("to user =>", toUser);

            senderUser.friendList = new Map();
            senderUser.friendList.set(toUser._id,{
                user : {
                    _id : toUser._id,
                    name : toUser.name,
                    lastName: toUser.lastName,
                    email : toUser.email, 
                },
                timeStamp : Date.now(),
                message : new Map()
            });

            toUser.friendList = new Map();
            toUser.friendList.set(senderUser._id, {
                user : {
                    _id : senderUser._id,
                    name : senderUser.name,
                    lastName: senderUser.lastName,
                    email : senderUser.email, 
                },
                timeStamp : Date.now(),
                message: new Map()
            });

            const senderUserSaved = await senderUser.save();
            const toUserSaved = await toUser.save();
            if(senderUserSaved && toUserSaved){
                res.status(200).send({message:"Friends added successfully", isAccepted : true, user : senderUser});
                return;
            }else{
                res.status(500).send({message:"something went wrong"});
            }
        }else{
           senderUser.friendRequests && senderUser.friendRequests.delete(to._id) ;
           toUser.friendRequests && toUser.friendRequests.delete(senderUser._id);
           const senderSaved = await senderUser.save();
           const toUserSaved = await toUser.save();
           if(senderSaved && toUserSaved){
            res.status(200).send({isAccepted: false})
           }
        }
    }
}

module.exports = {
    registerUser,
    validateUser,
    resetPassword,
    searchUsers,
    addFriend,
    handleFriendRequest
}