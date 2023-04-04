import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
})
export class AppModule {}
