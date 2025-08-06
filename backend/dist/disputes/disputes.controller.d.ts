import { DisputesService } from './disputes.service';
import { UpdateDisputeStatusDto } from './dto';
export declare class DisputesController {
    private readonly disputesService;
    constructor(disputesService: DisputesService);
    create(body: any, req: any): Promise<import("./dispute.entity").Dispute>;
    getMyDisputes(req: any): Promise<import("./dispute.entity").Dispute[]>;
    getAll(): Promise<import("./dispute.entity").Dispute[]>;
    updateStatus(id: string, body: UpdateDisputeStatusDto): Promise<import("./dispute.entity").Dispute>;
}
