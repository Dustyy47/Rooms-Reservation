import { OrderStatus } from '@prisma/client'
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class OrderDTO {
    @IsDateString()
    start: Date
    @IsDateString()
    end: Date
    @IsNumber()
    roomId: number
}

export class GetOrdersQueryDTO {
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus
    @IsString()
    @IsOptional()
    roomId?: string
}
