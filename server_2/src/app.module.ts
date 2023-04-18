import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'
import { RoomsModule } from './rooms/rooms.module'

@Module({
    imports: [
        MulterModule.register({
            dest: './images',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'images'),
        }),
        ConfigModule.forRoot({ isGlobal: true, load: [() => require('../ordersLimits.config.json')] }),
        AuthModule,
        PrismaModule,
        RoomsModule,
        OrdersModule,
    ],
})
export class AppModule {}
