import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ pingInterval: "25000" })
export class WSGateway implements OnGatewayConnection, OnGatewayDisconnect {
    protected logger: Logger = new Logger(WSGateway.name);
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        const { id } = client.handshake.query;
        this.logger.log(`Client ${id} connected to Websocket.`);
        if (id) {
            client.join(id);
        }
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client ${client.id} disconnected from Webscoket.`);
    }

    @SubscribeMessage('webrtc')
    onCall(client: Socket, { calleeId, payload }) {
        console.log(`on webrtc with calleeId: ${calleeId}, payload: ${payload.type}`)
        this.server.to(calleeId).emit('message', payload);
    }

}
