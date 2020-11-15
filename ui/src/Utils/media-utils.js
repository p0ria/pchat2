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