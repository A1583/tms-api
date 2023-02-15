import { Transform } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateOrderRequestDto {
    @IsString()
    @MaxLength(50)
    readonly tracking_number: string;

    @IsNumber()
    readonly amount: number;

    @IsNumber()
    readonly shipping_fee: number;

    @IsNumber()
    readonly logistic_id: number;
}
