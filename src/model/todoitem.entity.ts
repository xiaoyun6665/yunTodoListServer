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

    @Column({
        nullable: true
    })
    completeDay: number;

    @Column({
        nullable: true
    })
    completeMonth: number;

    @Column({
        nullable: true
    })
    completeYear: number;

    @Column()
    todoItem: string;

    @Column({default: 0})
    complete: number;
}