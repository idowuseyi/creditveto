import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';
import { UpdateDisputeStatusDto } from './dto';
import { DisputeStatus } from './dispute.entity';
import { User } from '../users/user.entity';
import { DisputeGateway } from '../websocket/websocket.gateway';

@Injectable()
export class DisputesService {
  constructor(
    @InjectRepository(Dispute)
    private disputesRepository: Repository<Dispute>,
    private readonly disputeGateway: DisputeGateway,
  ) { }

  async createDispute(data: Partial<Dispute>, user: User): Promise<Dispute> {
    // User selects item from credit report and raises a dispute
    const initialStatus = DisputeStatus.PENDING;
    const now = new Date().toISOString();
    const dispute = this.disputesRepository.create({
      ...data,
      user,
      status: initialStatus,
      history: [{ status: initialStatus, date: now, note: 'Dispute created' }],
    });
    return this.disputesRepository.save(dispute);
  }

  async getUserDisputes(userId: number): Promise<Dispute[]> {
    return this.disputesRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async getAllDisputes(): Promise<Dispute[]> {
    return this.disputesRepository.find({ relations: ['user'] });
  }

  async updateStatus(id: number, status: DisputeStatus, note?: string): Promise<Dispute> {
    const dispute = await this.disputesRepository.findOne({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');
    dispute.status = status;
    dispute.history = [
      ...(dispute.history || []),
      { status, date: new Date().toISOString(), note },
    ];
    await this.disputesRepository.save(dispute);
    this.disputeGateway.emitDisputeStatusUpdate(id, status);
    return dispute;
  }

  async getDisputeHistory(userId: number): Promise<Dispute[]> {
    return this.disputesRepository.find({ where: { user: { id: userId } }, relations: ['user'] });
  }
}
