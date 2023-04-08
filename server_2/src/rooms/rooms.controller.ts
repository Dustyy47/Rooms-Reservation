import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { CreateRoomDTO } from './dto';
import { RoomsService } from './rooms.service';

@UseGuards(JwtGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
  @Get('')
  async getAll() {
    return await this.roomsService.getAll();
  }

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createRoom(
    @Body() dto: CreateRoomDTO,
    @UploadedFile() image: { filename: string },
  ) {
    return await this.roomsService.createRoom(dto, image.filename);
  }
}
