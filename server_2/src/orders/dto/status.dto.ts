import { ApiProperty } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class StatusDTO {
    @ApiProperty()
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    roomId?: number
}
