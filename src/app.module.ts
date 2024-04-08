import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';


@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
