import { Controller, Get, Post, Body, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { DisputeStatus } from './dispute.entity';
import { UpdateDisputeStatusDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('disputes')
@ApiBearerAuth()
@Controller('disputes')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) { }

  // POST /disputes/create
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createDispute(@Body() body, @Request() req) {
    return this.disputesService.createDispute(body, req.user);
  }

  // GET /disputes/history
  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getDisputeHistory(@Request() req) {
    return this.disputesService.getDisputeHistory(req.user.userId);
  }

  // PUT /disputes/:id/stat
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update dispute status (admin only)' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ schema: { properties: { status: { type: 'string' }, note: { type: 'string' } } } })
  @Post(':id/stat')
  async updateDisputeStatus(
    @Param('id') id: string,
    @Body() body: { status: string; note?: string },
  ) {
    return this.disputesService.updateStatus(Number(id), body.status as any, body.note);
  }

  // Legacy endpoints for compatibility
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyDisputes(@Request() req) {
    return this.disputesService.getUserDisputes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.disputesService.getAllDisputes();
  }
}
