import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { AdminGuard, JwtGuard } from 'src/auth/guards'
import { CreateRoomDTO, GetRoomOrdersDTO, MongoIdDTO } from './dto'
import { ImageInterceptor } from './interceptors'
import { RoomsService } from './rooms.service'

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get('')
    async getAll() {
        return await this.roomsService.getAll()
    }

    @Post('')
    @UseGuards(AdminGuard)
    @UseInterceptors(ImageInterceptor)
    async createRoom(@Body() dto: CreateRoomDTO, @UploadedFile() image: { filename: string }) {
        return await this.roomsService.createRoom(dto, image.filename)
    }

    @Get(':id')
    async getRoom(@Param() { id: roomId }: MongoIdDTO) {
        return await this.roomsService.getRoom(roomId)
    }

    @Get(':roomId/orders/:date')
    async getRoomOrders(@Param() dto: GetRoomOrdersDTO) {
        return await this.roomsService.getRoomOrders(dto)
    }
}
