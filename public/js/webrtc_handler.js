import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails = null;

export const sendPreOffer = (callType, calleePersonalCode) => {
    // console.log(callType);
    // console.log('Pre offer function called to connect ', calleePersonalCode);
    
    connectedUserDetails = {
        callType,
        socketId: calleePersonalCode,
    }

    if(callType === constants.callType.CHAT_PERSONAL_CODE || 
        callType === constants.callType.VIDEO_PERSONAL_CODE) {

            const data = {
                callType, 
                calleePersonalCode
            };
            ui.showCallingDialog(callingDialogRejectCallHandler);
            wss.sendPreOffer(data);
        }

    
};

export const handlePreOffer = (data) => {
    console.log("preoffer with following data is received");
    console.log(data);

    const { callType, callerSocketId } = data;
    connectedUserDetails = {
        socketId: callerSocketId,
        callType: callType
    }

    if(callType === constants.callType.CHAT_PERSONAL_CODE || 
        callType === constants.callType.VIDEO_PERSONAL_CODE) {

            ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
}

const acceptCallHandler = () => {
    console.log("Call accepted");
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
    ui.showCallElements(connectedUserDetails.callType);
}

const rejectCallHandler = () => {
    console.log("Call rejected");
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = () => {
    console.log("You rejected the call by yourself");
    sendPreOfferAnswer();
}

const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer: preOfferAnswer
    }
    ui.removeAllDialogs();
    wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
    const preOfferAnswer = data.preOfferAnswer;
    console.log("preoffer answer with following data is received");
    console.log(data);
    ui.removeAllDialogs();


    if(preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        //show dialog that callee is not found
        ui.showInfoDialog(preOfferAnswer);
    }

    if(preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
        //show dialog that callee is not able to connect
        ui.showInfoDialog(preOfferAnswer);
    } 

    if(preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
        //Show dialog that call is reject by the callee
        ui.showInfoDialog(preOfferAnswer);
    } 

    if(preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
        //WEBRTC implemention of the call accepted
        ui.showCallElements(connectedUserDetails.callType);
    }
}