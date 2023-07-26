import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleConnection(client: Socket, ...args: any[]): any;
    handleDisconnect(client: Socket): any;
    afterInit(server: Server): void;
    handleMessage(data: any, client: Socket, payload: string): void;
}
