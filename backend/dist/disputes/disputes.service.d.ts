import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';
import { DisputeStatus } from './dispute.entity';
import { User } from '../users/user.entity';
import { DisputeGateway } from '../websocket/websocket.gateway';
export declare class DisputesService {
    private disputesRepository;
    private readonly disputeGateway;
    constructor(disputesRepository: Repository<Dispute>, disputeGateway: DisputeGateway);
    createDispute(data: Partial<Dispute>, user: User): Promise<Dispute>;
    getUserDisputes(userId: number): Promise<Dispute[]>;
    getAllDisputes(): Promise<Dispute[]>;
    updateStatus(id: number, status: DisputeStatus): Promise<Dispute>;
}
