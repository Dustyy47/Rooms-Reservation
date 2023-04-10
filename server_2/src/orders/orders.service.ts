import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { GetOrdersQueryDTO, OrderDTO } from './dto'

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService, private config: ConfigService) {}

    // Принимает ключ из .env файла со строкой типа HH:MM, возвращает объект с часами и минутами
    getEnvFormattedTime(key: string) {
        const [hours, minutes] = this.config
            .get(key)
            .split(':')
            .map((el) => +el)
        return { h: hours, m: minutes }
    }

    async isOrderTimeFree(dto: OrderDTO) {
        const orders = await this.prisma.order.findMany({
            where: {
                roomId: dto.roomId,
                status: 'FULFILLED',
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
        return orders?.length === 0
    }

    // Кидает ошибку если пользователь уже оставлял идентичную бронь
    async checkUserOrderDuplicated(dto: OrderDTO, userId: number) {
        const candidate = await this.prisma.order.findFirst({
            where: {
                roomId: dto.roomId,
                start: dto.start,
                end: dto.end,
                customerId: userId,
            },
        })
        if (!!candidate) {
            throw new BadRequestException('Вы уже оставляли идентичную бронь')
        }
    }

    async checkOrderTimeCorrect(dto: OrderDTO) {
        const start = new Date(dto.start)
        const end = new Date(dto.end)
        if (start >= end) throw new BadRequestException('Некорректный интервал времени')
        //TODO Добавить список недоступных дат по типу праздников, мб брать его из бд, пока проверяю только на выходные
        if (start.getDay() in [5, 6]) {
            throw new BadRequestException('Была выбрана недоступная для бронирования дата')
        }
        const { h: startHours, m: startMinutes } = this.getEnvFormattedTime('ORDER_START')
        const { h: endHours, m: endMinutes } = this.getEnvFormattedTime('ORDER_END')
        if (
            start.getHours() < startHours ||
            (start.getHours() === startHours && start.getMinutes() < startMinutes) ||
            end.getHours() > endHours ||
            (end.getHours() === endHours && end.getMinutes() > endMinutes)
        ) {
            throw new BadRequestException('Было выбрано недоступное для бронирования время')
        }

        const maxOrderTime = this.getEnvFormattedTime('MAX_ORDER_DURATION')
        const maxOrderDuration = (maxOrderTime.h * 60 + maxOrderTime.m) * 60000
        const orderDuration = end.getTime() - start.getTime()
        if (orderDuration > maxOrderDuration) {
            throw new BadRequestException('Время бронирования превышает максимальное')
        }

        const isFree = await this.isOrderTimeFree(dto)
        if (!isFree) throw new ConflictException('Помещение уже забронировано на это время')
    }

    async createOrder(dto: OrderDTO, userId: number) {
        try {
            await this.checkOrderTimeCorrect(dto)
            await this.checkUserOrderDuplicated(dto, userId)
        } catch (e) {
            console.log('@ERROR', e)
            throw e
        }
        try {
            const order = await this.prisma.order.create({
                data: {
                    start: dto.start,
                    end: dto.end,
                    roomId: dto.roomId,
                    customerId: userId,
                },
            })
            return order
        } catch (e) {
            return e
        }
    }

    async getOrders(dto: GetOrdersQueryDTO) {
        try {
            return this.prisma.order.findMany({
                where: { status: dto.status, roomId: +dto.roomId },
                include: {
                    customer: {
                        select: { id: true, fullname: true, email: true },
                    },
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
