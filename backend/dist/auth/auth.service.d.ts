import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: number;
        email: string;
        role: import("../users/user.entity").UserRole;
    }>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(data: any): Promise<{
        access_token: string;
        user: any;
    }>;
}
