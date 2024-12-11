const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    connectedUsers: { type: Map, required: false },
    activeStatus: { type: Boolean, required: false },
    isTyping: { type: Boolean, required: false },
    friendRequests: { type: Map, of: Object, default: new Map() }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;