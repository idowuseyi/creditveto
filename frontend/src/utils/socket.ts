import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(token: string) {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      auth: { token },
      transports: ['websocket'],
    });
  }
  return socket;
}
