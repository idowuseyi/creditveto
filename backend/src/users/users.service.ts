import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: any): Promise<User> {
    const user = this.usersRepository.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
      role: data.role || UserRole.USER,
    });
    if (Array.isArray(user)) {
      throw new Error('usersRepository.create returned an array, expected an object');
    }
    const saved = await this.usersRepository.save(user);
    if (Array.isArray(saved)) {
      return saved[0];
    }
    return saved;
  }
}
