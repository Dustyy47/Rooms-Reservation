import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './images',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    RoomsModule,
  ],
})
export class AppModule {}
