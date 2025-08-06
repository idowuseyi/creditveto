import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class DisputeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // Client connected
  }

  handleDisconnect(client: any) {
    // Client disconnected
  }

  // Emit dispute status update to all clients
  emitDisputeStatusUpdate(disputeId: number, status: string) {
    this.server.emit('disputeStatusUpdate', { disputeId, status });
  }

  // For testing: allow clients to join a room (optional)
  @SubscribeMessage('joinDisputeRoom')
  handleJoinRoom(@MessageBody() data: { disputeId: number }, client: any) {
    client.join(`dispute_${data.disputeId}`);
    return { joined: data.disputeId };
  }
}
