import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class DisputeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    emitDisputeStatusUpdate(disputeId: number, status: string): void;
    handleJoinRoom(data: {
        disputeId: number;
    }, client: any): {
        joined: number;
    };
}
