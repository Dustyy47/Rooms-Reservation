import { IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateRoomDTO {
    @IsString()
    title: string
    @IsString()
    description?: string
    @IsString()
    adress: string
}

export class GetRoomOrdersDTO {
    @IsString()
    roomId: string
    @IsDateString()
    date: string
}
