import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { RoomsModule } from './rooms/rooms.module'
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        MulterModule.register({
            dest: './images',
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        PrismaModule,
        RoomsModule,
        OrdersModule,
    ],
})
export class AppModule {}
