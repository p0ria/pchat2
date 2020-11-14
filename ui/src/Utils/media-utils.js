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

export const streamToByteArray = stream => {
    var recorder, source = new MediaSource()

    var elem = createVideoElem()
    elem.src = URL.createObjectURL(source)
    source.addEventListener('sourceopen', sourceOpen)

    function sourceOpen() {
        var buffer = source.addSourceBuffer('video/webm;codecs=vp9')
        recorder = new MediaRecorder(stream)
        recorder.start(1000)

        recorder.ondataavailable = function (e) {
            var fileReader = new FileReader();
            fileReader.onload = function () {
                //buffer.appendBuffer(fileReader.result);
                debugger;
                console.log(fileReader);
            };
            fileReader.readAsArrayBuffer(e.data);
        }
    }
}

function createVideoElem() {
    var elem = document.createElement('video')
    elem.controls = true
    elem.autoplay = true // for chrome
    elem.play() // for firefox
    document.body.appendChild(elem)
    return elem
}