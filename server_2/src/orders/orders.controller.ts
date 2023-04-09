import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { User } from 'src/auth/decorators'
import { JwtGuard } from 'src/auth/guards'
import { OrderDTO } from './dto'
import { OrdersService } from './orders.service'

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Post('create')
    async createOrder(@Body() dto: OrderDTO, @User('id') userId) {
        return await this.ordersService.createOrder(dto, userId)
    }
}
