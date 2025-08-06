import { User } from '../users/user.entity';
export declare enum DisputeStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    REJECTED = "rejected"
}
export declare class Dispute {
    id: number;
    title: string;
    description: string;
    status: DisputeStatus;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
