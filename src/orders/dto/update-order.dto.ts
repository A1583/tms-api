import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderRequestDto } from './CreateOrderRequestDto.dto';

export class UpdateOrderDto extends PartialType(CreateOrderRequestDto) {}
