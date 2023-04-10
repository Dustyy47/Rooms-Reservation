import { ApiProperty } from '@nestjs/swagger'
import { OrderStatus } from '@prisma/client'
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class OrderDTO {
    @ApiProperty()
    @IsDateString()
    start: Date
    @ApiProperty()
    @IsDateString()
    end: Date
    @ApiProperty()
    @IsNumber()
    roomId: number
}

export class GetOrdersQueryDTO {
    @ApiProperty()
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus
    @ApiProperty()
    @IsString()
    @IsOptional()
    roomId?: string
}
