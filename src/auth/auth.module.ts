import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "AKDMWIDFNIWFNIWFNIEFN",
      signOptions: { expiresIn: '10d' }
    }),
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
