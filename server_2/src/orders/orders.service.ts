import { ConflictException, Injectable } from '@nestjs/common'
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

        return orders?.length > 0
    }

    async createOrder(dto: OrderDTO, userId: number) {
        if (this.isOrderTimeFree(dto, 'FULFILLED'))
            throw new ConflictException('Помещение уже забранировано на это время')
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
}
