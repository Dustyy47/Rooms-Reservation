import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDTO } from './dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    const rooms = await this.prisma.room.findMany();
    return rooms;
  }
  async createRoom(dto: CreateRoomDTO, imageName: string) {
    console.log('@ROOM DTO', JSON.stringify(dto));
    const room = await this.prisma.room.create({
      data: {
        title: dto.title,
        adress: dto.adress,
        description: dto.description,
        image: imageName,
      },
    });
    return room;
  }
}
