import { IsString } from 'class-validator';

export class CreateRoomDTO {
  @IsString()
  title: string;
  @IsString()
  description?: string;
  @IsString()
  adress: string;
}
