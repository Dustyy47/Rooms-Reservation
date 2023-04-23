import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateRoomDTO, GetRoomOrdersDTO } from './dto'

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) {}
    async getAll() {
        const rooms = await this.prisma.room.findMany()
        return rooms
    } //
    async createRoom(dto: CreateRoomDTO, imageName: string) {
        try {
            const room = await this.prisma.room.create({
                data: {
                    title: dto.title,
                    adress: dto.adress,
                    description: dto.description,
                    image: imageName,
                },
            })
            return room
        } catch (e) {
            if (e.code === 'P2002') {
                throw new ConflictException('Комната с таким названием уже существует')
            }
            return e
        }
    }
    async getRoom(roomId: string) {
        try {
            const room = this.prisma.room.findFirst({
                where: { id: roomId },
                include: { Order: { where: { status: 'FULFILLED' }, select: { start: true, end: true } } },
            })
            return room
        } catch (e) {
            console.log('ERROR', e, e.code)
            return e
        }
    }

    async getRoomOrders(dto: GetRoomOrdersDTO) {
        const start = new Date(dto.date)
        const end = new Date(dto.date)
        end.setDate(end.getDate() + 1)

        if (isNaN(+start) || isNaN(+end)) {
            throw new BadRequestException('Неверный формат даты')
        }
        try {
            const orders = this.prisma.order.findMany({
                where: {
                    roomId: dto.roomId,
                    status: 'FULFILLED',
                    start: {
                        gte: start,
                        lte: end,
                    },
                },
                select: { start: true, end: true },
            })

            return orders
        } catch (e) {
            console.log('ERROR ROOM ORDERS', e, e.code)
            return e
        }
    }
}
