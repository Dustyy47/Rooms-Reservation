import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { AdminGuard, JwtGuard } from 'src/auth/guards'
import { CreateRoomDTO } from './dto'
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

    @Post('create')
    @UseGuards(AdminGuard)
    @UseInterceptors(ImageInterceptor)
    async createRoom(@Body() dto: CreateRoomDTO, @UploadedFile() image: { filename: string }) {
        return await this.roomsService.createRoom(dto, image.filename)
    }
}
