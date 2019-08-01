import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core';
import { User } from '../database/entities';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectRepository(User) protected readonly repo: Repository<User>) {
        super(repo);
    }
}
