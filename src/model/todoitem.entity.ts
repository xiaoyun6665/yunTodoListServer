import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'

@Entity('todoitem')
export class Todoitem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createDay: number;

    @Column()
    createMonth: number;

    @Column()
    createYear: number;

    @Column()
    completeDay: number;

    @Column()
    completeMonth: number;

    @Column()
    completeYear: number;

    @Column()
    todoItem: string;

    @Column({default: 0})
    complete: number;
}