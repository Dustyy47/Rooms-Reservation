import { OrderStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class StatusDTO {
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus
    @IsNumber()
    @IsOptional()
    roomId?: number
}
