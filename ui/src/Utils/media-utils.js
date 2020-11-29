export const hasUserMedia = () => {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

export const getAudioStream = () => {
    return new Promise((resolve, reject) => {
        if (hasUserMedia()) {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            navigator.getUserMedia({ audio: true },
                function (stream) {
                    resolve(stream);
                }, function (err) {
                    reject(err);
                });
        } else {
            reject("Sorry, your browser does not support getUserMedia.");
        }
    })
}

export const getUserMedia = (options = { audio: true, video: true }) => {
    return navigator.mediaDevices.getUserMedia(options);
}

export const getPeerConnection = () => {
    if (hasRTCPeerConnection()) {
        var configuration = {
            "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
        };
        return new RTCPeerConnection(configuration);
    } else {
        throw new Error("Browser does not suppoert WebRTC");
    }
}

const hasRTCPeerConnection = () => {
    window.RTCPeerConnection =
        window.RTCPeerConnection ||
        window.webkitRTCPeerConnection ||
        window.mozRTCPeerConnection;

    window.RTCSessionDescription =
        window.RTCSessionDescription ||
        window.webkitRTCSessionDescription ||
        window.mozRTCSessionDescription;

    window.RTCIceCandidate =
        window.RTCIceCandidate ||
        window.webkitRTCIceCandidate ||
        window.mozRTCIceCandidate;
    return !!window.RTCPeerConnection;
}