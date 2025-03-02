import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id : number;
    @Column({ nullable: false})//required
    name : string;
    @Column({ nullable: false})//required
    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    price : number;
    @Column({ nullable: false})//required
    quantity : number;
}