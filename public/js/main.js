import * as store from './store.js';
import * as wss from './wss.js';
import * as webrtc_handler from './webrtc_handler.js';
import * as constants from './constants.js';


//Initialization of socket io connection
const socket = io('/');
wss.registerSocketEvent(socket);

//Registering events for personal code copy button
const personalCodeCopyButton = document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click', () => {
    const personalCode = store.getState().socketId;
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
})

//Registering events for the connection buttons
const personalCodeChatButton = document.getElementById('personal_code_chat_button');
const personalCodeVideoButton = document.getElementById('personal_code_video_button');

personalCodeChatButton.addEventListener('click', () => {
    console.log('chat button clicked');
    const calleePersonalCode = document.getElementById('personal_code_input').value;
    const callType = constants.callType.CHAT_PERSONAL_CODE;
    webrtc_handler.sendPreOffer(callType, calleePersonalCode);
})

personalCodeVideoButton.addEventListener('click', () => {
    console.log('video button clicked');
    const calleePersonalCode = document.getElementById('personal_code_input').value;
    const callType = constants.callType.VIDEO_PERSONAL_CODE;
    webrtc_handler.sendPreOffer(callType, calleePersonalCode);
})
