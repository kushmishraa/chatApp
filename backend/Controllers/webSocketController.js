const WebSocket = require('ws');

let wss = null


const initializeWS = (req, res) => {
    if (req.body) {
        console.log("=>", req.body)
        const { serverStatus } = req.body
        if (serverStatus && !wss) {
            const server = req.app.locals.server;
            wss = new WebSocket.Server({ server })


            wss.on("connection", (ws) => {
                console.log("Someone Connected");
            });

            console.log("web socket connection established");

            res.status(200).send({ message: "Web socket initialized" })
        }
    }
}

module.exports = {
    initializeWS,
    wss,
}