import { IsDateString, IsMongoId, IsString } from 'class-validator'
export class CreateRoomDTO {
    @IsString()
    title: string
    @IsString()
    description?: string
    @IsString()
    adress: string
}

export class GetRoomOrdersDTO {
    @IsMongoId()
    roomId: string
    @IsDateString()
    date: string
}

export class MongoIdDTO {
    @IsMongoId()
    id: string
}
