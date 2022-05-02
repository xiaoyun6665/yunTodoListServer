import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Todoitem } from '../model/todoitem.entity'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todoitem) 
    private todoItemRepository: Repository<Todoitem>
  ){}

  getOneTodoItem(id: number): Promise<Todoitem> {
    return this.todoItemRepository.findOne(id);
  }
}
