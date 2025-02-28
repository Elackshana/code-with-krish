import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    name : string;
    @Column()
    email : string;
    @Column()
    address : string;
}