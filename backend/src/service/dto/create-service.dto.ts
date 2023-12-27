import {IsNotEmpty, IsString} from 'class-validator'

export class    CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
  @IsString()
  image: string;
}
