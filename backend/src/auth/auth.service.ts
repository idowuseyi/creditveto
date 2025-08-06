import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'superrefreshsecret';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { secret: REFRESH_SECRET, expiresIn: '7d' }),
      user,
    };
  }

  async register(data: any) {
    const user = await this.usersService.create(data);
    return this.login(user);
  }

  async regenerateToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: REFRESH_SECRET });
      // Optionally check if user still exists, etc.
      return {
        access_token: this.jwtService.sign({ email: payload.email, sub: payload.sub, role: payload.role }),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
