import { IsEnum } from "class-validator";

export enum OrderStatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELEVERED='DELEVERED',
    CANCELED='CANCELED'
}
export class UpdateOrdersStatus{
    @IsEnum(OrderStatus)
    status: OrderStatus;
}