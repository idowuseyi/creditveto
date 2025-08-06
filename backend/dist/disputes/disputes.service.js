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
exports.DisputesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dispute_entity_1 = require("./dispute.entity");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
let DisputesService = class DisputesService {
    constructor(disputesRepository, disputeGateway) {
        this.disputesRepository = disputesRepository;
        this.disputeGateway = disputeGateway;
    }
    async createDispute(data, user) {
        const dispute = this.disputesRepository.create(Object.assign(Object.assign({}, data), { user }));
        return this.disputesRepository.save(dispute);
    }
    async getUserDisputes(userId) {
        return this.disputesRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
    }
    async getAllDisputes() {
        return this.disputesRepository.find({ relations: ['user'] });
    }
    async updateStatus(id, status) {
        const dispute = await this.disputesRepository.findOne({ where: { id } });
        if (!dispute)
            throw new common_1.NotFoundException('Dispute not found');
        dispute.status = status;
        await this.disputesRepository.save(dispute);
        this.disputeGateway.emitDisputeStatusUpdate(id, status);
        return dispute;
    }
};
exports.DisputesService = DisputesService;
exports.DisputesService = DisputesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dispute_entity_1.Dispute)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        websocket_gateway_1.DisputeGateway])
], DisputesService);
//# sourceMappingURL=disputes.service.js.map