import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { OrderStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { OrderDTO } from './dto'

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async isOrderTimeFree(dto: OrderDTO, status: OrderStatus) {
        const orders = await this.prisma.order.findMany({
            where: {
                roomId: dto.roomId,
                status: status,
                OR: [
                    {
                        start: {
                            lte: dto.end,
                            gte: dto.start,
                        },
                    },
                    {
                        end: {
                            lte: dto.end,
                            gte: dto.start,
                        },
                    },
                    {
                        start: {
                            lte: dto.start,
                        },
                        end: {
                            gte: dto.end,
                        },
                    },
                ],
            },
        })
        console.log(orders?.length === 0)
        return orders?.length === 0
    }

    async createOrder(dto: OrderDTO, userId: number) {
        const isFree = this.isOrderTimeFree(dto, 'FULFILLED')
        if (!isFree) throw new ConflictException('Помещение уже забронировано на это время')
        try {
            const order = await this.prisma.order.create({
                data: {
                    start: dto.start,
                    end: dto.end,
                    roomId: dto.roomId,
                    orderById: userId,
                },
            })
            return order
        } catch (e) {
            return e
        }
    }

    async getOrders(status?: OrderStatus) {
        try {
            return this.prisma.order.findMany({
                where: { status },
                select: {
                    id: true,
                    start: true,
                    end: true,
                    room: true,
                    orderBy: { select: { id: true, fullname: true, email: true } },
                    status: true,
                },
            })
        } catch (e) {
            return e
        }
    }

    async changeOrderStatus(orderId: number, status: OrderStatus) {
        try {
            await this.prisma.order.update({ where: { id: +orderId }, data: { status } })
        } catch (e) {
            if (e.code === 'P2025') {
                throw new NotFoundException('Заказа с таким id не существует')
            }
            console.log(e, e.code)
            return e
        }
        return { statusCode: 200 }
    }
}
