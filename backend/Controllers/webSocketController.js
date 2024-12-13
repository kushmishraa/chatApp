const WebSocket = require('ws');
const userController = require('./userController');

let wss = null;

const initializeWS = (req, res) => {
    if (req.body) {
        console.log("=>", req.body)
        const { serverStatus } = req.body
        if (serverStatus && !wss) {
            const server = req.app.locals.server;
            wss = new WebSocket.Server({ server })
        }
            wss.on("connection", (ws) => {
                console.log("web socket connection established");
                console.log("Someone Connected");
                ws.onmessage = (event) =>{
                    console.log("message from socket =>", JSON.parse(event.data));
                    const data = JSON.parse(event.data);
                    console.log(data.message)
                    if(data?.message?.type == "sendMessage"){
                        console.log("sending message");
                        const msgData = data.message;
                        userController.sendMessage(msgData);
                    }
                }
            });
            res.status(200).send({ message: "Web socket initialized" })
        
    }
}

module.exports = {
    initializeWS,
    wss,
}