import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DisputeStatus } from './dispute.entity';

export class UpdateDisputeStatusDto {
  @IsEnum(DisputeStatus)
  status: DisputeStatus;
}
