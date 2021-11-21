import * as store from './store.js';
import * as ui from './ui.js';
import * as webrtc_handler from './webrtc_handler.js';

let socketIO = null;

export const registerSocketEvent = (socket) => {
    socket.on('connect', () => {
        socketIO = socket;
        // console.log("Successfully connected to webserver");
        // console.log(socket.id);
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
    })

    socket.on("pre-offer", (data) => {
        webrtc_handler.handlePreOffer(data);
    })

    socket.on("pre-offer-answer", (data) => {
        webrtc_handler.handlePreOfferAnswer(data);
    })
};

export const sendPreOffer = (data) => {
    socketIO.emit('pre-offer', data);
}

export const sendPreOfferAnswer = (data) => {
    socketIO.emit('pre-offer-answer', data);
}
