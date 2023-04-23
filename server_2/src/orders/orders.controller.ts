import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { User } from 'src/auth/decorators'
import { AdminGuard, JwtGuard } from 'src/auth/guards'
import { MongoIdDTO } from 'src/rooms/dto'
import { GetOrdersQueryDTO, OrderDTO, StatusDTO } from './dto'
import { OrdersService } from './orders.service'

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Post('')
    async createOrder(@Body() dto: OrderDTO, @User() { id: userId }: MongoIdDTO) {
        return await this.ordersService.createOrder(dto, userId)
    }

    @Get('me')
    async getMyOrders(@Query() dto: GetOrdersQueryDTO, @User() { id: userId }: MongoIdDTO) {
        return await this.ordersService.getMyOrders(dto, userId)
    }

    @Get('')
    @UseGuards(AdminGuard)
    async getOrders(@Query() dto: GetOrdersQueryDTO) {
        return await this.ordersService.getOrders(dto)
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async changeOrderStatus(@Param() { id }: MongoIdDTO, @Query() dto: StatusDTO) {
        return await this.ordersService.changeOrderStatus(id, dto.status)
    }
}
