import { IsDateString, IsNumber } from 'class-validator'

export class OrderDTO {
    @IsDateString()
    start: Date
    @IsDateString()
    end: Date
    @IsNumber()
    roomId: number
}
