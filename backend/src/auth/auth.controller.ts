import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  async login(@Body() body) {
    return this.authService.login(await this.authService.validateUser(body.email, body.password));
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @Post('regenerate-token')
  @ApiOperation({ summary: 'Regenerate access token using refresh token' })
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  async regenerateToken(@Body() body) {
    const { refreshToken } = body;
    if (!refreshToken) throw new UnauthorizedException('Refresh token required');
    return this.authService.regenerateToken(refreshToken);
  }
}
