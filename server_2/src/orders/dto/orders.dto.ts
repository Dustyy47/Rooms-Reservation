import { OrderStatus } from '@prisma/client'
import { IsDateString, IsEnum, IsMongoId, IsOptional } from 'class-validator'

export class OrderDTO {
    @IsDateString()
    start: Date
    @IsDateString()
    end: Date
    @IsMongoId()
    roomId: string
}

export class GetOrdersQueryDTO {
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus
    @IsMongoId()
    @IsOptional()
    roomId?: string
}
