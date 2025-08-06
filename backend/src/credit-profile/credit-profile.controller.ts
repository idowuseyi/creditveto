import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MockCreditProvider } from './credit-provider.adapter';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('credit-profile')
@ApiBearerAuth()
@Controller('credit-profile')
export class CreditProfileController {
  constructor(private readonly creditProvider: MockCreditProvider) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get user credit profile (mocked)' })
  async getProfile(@Request() req) {
    return this.creditProvider.getProfile(req.user.userId);
  }
}
