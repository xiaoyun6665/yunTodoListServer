import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Todoitem } from '../model/todoitem.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todoitem)
    private todoItemRepository: Repository<Todoitem>
  ) { }

  getOneTodoItem(id: number): Promise<Todoitem> {
    return this.todoItemRepository.findOne(id);
  }

  getOneTodoItemByDay(
    year: number, month: number, day: number,
    pageSize: number, pages: number
  ): Promise<Todoitem[]> {
    return this.todoItemRepository.find({
      where: {
        createDay: day, createMonth: month,
        createYear: year
      },
      order: {
        id: 'ASC'
      },
      skip: pages * pageSize,
      take: pageSize
    });
  }
}
