import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { User } from 'src/auth/decorators'
import { AdminGuard, JwtGuard } from 'src/auth/guards'
import { GetOrdersQueryDTO, OrderDTO, StatusDTO } from './dto'
import { OrdersService } from './orders.service'

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Post('')
    async createOrder(@Body() dto: OrderDTO, @User('id') userId) {
        return await this.ordersService.createOrder(dto, userId)
    }

    @Get('')
    @UseGuards(AdminGuard)
    async getOrders(@Query() dto: GetOrdersQueryDTO) {
        return await this.ordersService.getOrders(dto)
    }

    @HttpCode(200)
    @UseGuards(AdminGuard)
    @Patch(':orderId')
    async changeOrderStatus(@Param('orderId') orderId: number, @Query() dto: StatusDTO) {
        return await this.ordersService.changeOrderStatus(orderId, dto.status)
    }
}
