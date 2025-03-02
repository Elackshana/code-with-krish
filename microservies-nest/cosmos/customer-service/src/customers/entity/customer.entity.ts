import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id : number;
    @Column({ nullable: false})//required
    name : string;
    @Column({ unique: true , nullable: false})
    email : string;
    @Column({ nullable: true })//optional
    address : string;
}