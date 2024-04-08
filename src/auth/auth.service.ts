import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepo : Repository<User> 
    ) {}
    async signIn(username: string, pass: string) {
        const user = await this.userRepo.findOne({ where: {name: username}});
        if(!user){
            throw new UnauthorizedException('Invalid username or password.');
        }
        const comparePass = await bcrypt.compare(pass.trim(), user.password);
        if(!comparePass) {
            throw new UnauthorizedException('Invalid username or password.');
        }
        const payload = { sub: user.id, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async register(username: string, pass: string, pass2: string) {
        if (!username) {
            throw new BadRequestException('Username cannot be empty.');
        }
        if (!pass) {
            throw new BadRequestException('Password cannot be empty.');
        }
        if (pass !== pass2) {
            throw new BadRequestException('Passwords do not match.');
        }
        if (pass.length < 8) {
            throw new BadRequestException('Password must be at least 8 characters long.');
        }
        const checkUser = await this.userRepo.findOne({ where: { name: username } });
        if (checkUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPass = await bcrypt.hash(pass.trim(), 10)
        const user = this.userRepo.create({ name: username.trim(), password: hashedPass });
        return await this.userRepo.save(user);
    }
}
