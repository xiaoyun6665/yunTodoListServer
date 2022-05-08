import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Todoitem } from '../model/todoitem.entity'
import { ResultData, ResultDataErrString, ResultDataCode } from '../utils/returnDataUtil'
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todoitem)
    private todoItemRepository: Repository<Todoitem>
  ) { }

  async getOneTodoItem(id: number): Promise<ResultData<Todoitem>> {
    try {
      let data = await this.todoItemRepository.findOne(id);
      return new ResultData<Todoitem>()
        .setCode(ResultDataCode.success)
        .setData(data);
    }
    catch (error) {
      return new ResultData<Todoitem>()
        .setCode(ResultDataCode.error)
        .setErrCode(ResultDataErrString.DATABASE_ERR);
    }
  }

  getTodoItemByDay(
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

  getTodoItemByMonth(
    year: number, month: number,
    pageSize: number, pages: number
  ): Promise<Todoitem[]> {
    return this.todoItemRepository.find({
      where: {
        createMonth: month,
        createYear: year
      },
      order: {
        id: 'ASC'
      },
      skip: pages * pageSize,
      take: pageSize
    });
  }

  getTodoItemByYear(
    year: number,
    pageSize: number, pages: number
  ): Promise<Todoitem[]> {
    return this.todoItemRepository.find({
      where: {
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
