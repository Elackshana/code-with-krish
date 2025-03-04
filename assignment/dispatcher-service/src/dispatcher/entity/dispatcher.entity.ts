import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Dispatcher{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    vehicle_number : string;
    @Column()
    city : string;
  
}