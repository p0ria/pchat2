import io from "socket.io-client";
export const connectToWebrtcSocket = (userId, dispatch) => {
    const socket = io(process.env.REACT_APP_API_URL, {
        transports: ['websocket'],
        query: {
            id: userId
        }
    });
    console.log(process.env.REACT_APP_API_URL);
    socket.on('connect', () => {
        console.log('connected to webrtc socket');
    })
    socket.on('disconnect', () => {
        console.log('disconnected from webrtc socket');
    })
    socket.on('message', payload => {
        console.log(`message arrived from webrtc socket`, payload);
    })

}

