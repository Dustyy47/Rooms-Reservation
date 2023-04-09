import { OrderStatus } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class StatusDTO {
    @IsEnum(OrderStatus)
    status
}
