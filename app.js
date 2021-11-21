const { constants } = require('buffer');
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express(); //Creating an Express Application

const server = http.createServer(app); //Creating server

//Connecting socket.io and server
const io = require("socket.io")(server);

//To make the files inside the public folder
//Accessible to everyone
app.use(express.static('public'))

//How to Respond when the request is made 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

//List of the socket ids of the connected users
let connectedPeers = [];

//Whenever the new user is connected to the server
io.on('connection', (socket) => {
    // console.log(`${socket.id} connected to socket.io server`);
    // console.log(connectedPeers);

    //Adding the current user in the list
    connectedPeers.push(socket.id);

    //
    socket.on("pre-offer", (data) => {
        // console.log("Pre offer recieved with following data");
        // console.log(data); 
        const { calleePersonalCode, callType } = data;
        const connectedPeer = connectedPeers.find((peerSocketId) => {
            return peerSocketId === calleePersonalCode;
        });

        if(connectedPeer) {
            const data = {
                callerSocketId: socket.id,
                callType: callType
            }

            io.to(calleePersonalCode).emit('pre-offer', data);       
        } else {
            const data = {
                preOfferAnswer: 'CALLEE_NOT_FOUND',

            }
            io.to(socket.id).emit('pre-offer-answer', data);
        }
    });

    //
    socket.on("pre-offer-answer", (data) => {
        console.log("Pre offer answer has been recieved with following data");
        console.log(data);

        // const callerSocketId  = { data }
        const connectedPeer = connectedPeers.find((peerSocketId) => {
            return peerSocketId === data.callerSocketId;
        });
        if(connectedPeer) {
            io.to(data.callerSocketId).emit('pre-offer-answer', data);
        }

    });

    socket.on("disconnect", () => {
        // console.log(`${socket.id} is disconnected`);

        //Removing the current user from the list
        const newConnectedPeers = connectedPeers.filter((id) => {
            return id !== socket.id;
        })

        connectedPeers = newConnectedPeers;
        // console.log(connectedPeers);
    })
});

//Server is listening at the mentioned PORT
server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})
