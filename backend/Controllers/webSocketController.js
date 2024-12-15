const WebSocket = require('ws');
const userController = require('./userController');

let wss = null;

const initializeWS = (req, res) => {
    if (req.body) {
        const { serverStatus, loggedInUser } = req.body
        if (serverStatus && !wss) {
            const server = req.app.locals.server;
            wss = new WebSocket.Server({ server })
        }

        wss.on("connection", (ws) => {
            ws.userId = loggedInUser._id;
            ws.onmessage = async (event) => {
                const data = JSON.parse(event.data);
                if (data?.message?.type == "sendMessage") {
                    const msgData = data.message;
                    const { newLoggedInUser, newReciverUser } = await userController.sendMessage(msgData);
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            if (client.userId == data.message.loggedInUser) {
                                client.send(JSON.stringify({
                                    type: "updatedMessage",
                                    updatedUser: newLoggedInUser
                                }));
                            } else if (client.userId == data.message.selectedUser) {
                                client.send(JSON.stringify({
                                    type: "updatedMessage",
                                    updatedUser: newReciverUser
                                }));
                            }

                        }

                    });
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