let state = {
    socketId: null,
    localStream: null,
    remoteStream: null,
    screenSharingActive: false,
    screenSharingStream: null,
    allowConnectionsFromStrangers: false,
};

export const setSocketId = (socketId) => {
    state = { ...state, socketId };
    console.log("store has setted the socket as ", socketId);
    console.log(state);
};

export const setLocalStream = (stream) => {
    state = {...state, localStream: stream };
}

export const setAllowConnectionsFromStranger = (allowConnection) => {
    state = {...state, allowConnectionsFromStrangers: allowConnection};
}

export const setScreenSharingActive = (screenSharingActive) => {
    state = {...state, screenSharingActive};
};

export const setScreenSharingStream = (stream) => {
    state = {...state, screenSharingStream: stream};
}

export const setRemoteStream = (stream) => {
    state = {...state, remoteStream: stream};
}

export const getState = () => {
    return state;
}