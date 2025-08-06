"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let DisputeGateway = class DisputeGateway {
    handleConnection(client) {
    }
    handleDisconnect(client) {
    }
    emitDisputeStatusUpdate(disputeId, status) {
        this.server.emit('disputeStatusUpdate', { disputeId, status });
    }
    handleJoinRoom(data, client) {
        client.join(`dispute_${data.disputeId}`);
        return { joined: data.disputeId };
    }
};
exports.DisputeGateway = DisputeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DisputeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinDisputeRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DisputeGateway.prototype, "handleJoinRoom", null);
exports.DisputeGateway = DisputeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], DisputeGateway);
//# sourceMappingURL=websocket.gateway.js.map