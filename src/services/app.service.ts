import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Todoitem } from '../model/todoitem.entity'
import { ResultData, ResultDataErrString, ResultDataCode } from '../utils/returnDataUtil'
import { getLogger, Logger } from 'log4js'
import { addOneTodoItemDto } from 'src/dto/addOneTodoItemDto';
@Injectable()
export class AppService {
  private logger:Logger;

  constructor(
    @InjectRepository(Todoitem)
    private todoItemRepository: Repository<Todoitem>
  ) {
    this.logger = getLogger();
  }

  async getOneTodoItem(id: number): Promise<ResultData<Todoitem>> {
    try {
      let data = await this.todoItemRepository.findOne(id);
      return new ResultData<Todoitem>()
        .setCode(ResultDataCode.success)
        .setData(data);
    }
    catch (error) {
      this.logger.error(error);
      return new ResultData<Todoitem>()
        .setCode(ResultDataCode.error)
        .setErrCode(ResultDataErrString.DATABASE_ERR);
    }
  }

  async getTodoItemByDay(
    year: number, month: number, day: number,
    pageSize: number, pages: number
  ): Promise<ResultData<Todoitem[]>> {
    try {
      let data = await this.todoItemRepository.find({
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
      return new ResultData<Todoitem[]>()
        .setCode(ResultDataCode.success)
        .setData(data);
    }
    catch (error) {
      this.logger.error(error);
      return new ResultData<Todoitem[]>()
        .setCode(ResultDataCode.error)
        .setErrCode(ResultDataErrString.DATABASE_ERR);
    }
  }

  async getTodoItemByMonth(
    year: number, month: number,
    pageSize: number, pages: number
    ): Promise<ResultData<Todoitem[]>> {
      try {
        let data = await this.todoItemRepository.find({
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
        return new ResultData<Todoitem[]>()
          .setCode(ResultDataCode.success)
          .setData(data);
      }
      catch (error) {
        this.logger.error(error);
        return new ResultData<Todoitem[]>()
          .setCode(ResultDataCode.error)
          .setErrCode(ResultDataErrString.DATABASE_ERR);
      }
  }

  async getTodoItemByYear(
    year: number,
    pageSize: number, pages: number
  ): Promise<ResultData<Todoitem[]>> {
    try {
      let data = await this.todoItemRepository.find({
        where: {
          createYear: year
        },
        order: {
          id: 'ASC'
        },
        skip: pages * pageSize,
        take: pageSize
      });
      return new ResultData<Todoitem[]>()
        .setCode(ResultDataCode.success)
        .setData(data);
    }
    catch (error) {
      this.logger.error(error);
      return new ResultData<Todoitem[]>()
        .setCode(ResultDataCode.error)
        .setErrCode(ResultDataErrString.DATABASE_ERR);
    }
  }

  async addOneTodoItem(
    params: addOneTodoItemDto
  ): Promise<ResultData<Object>> {
    try {
      if(
        params.createDay == null || params.createMonth == null
        || params.createYear == null || params.todoItem == null
      ) {
        return new ResultData<Object>()
        .setCode(ResultDataCode.error)
        .setData(ResultDataErrString.PARAMS_NULL_ERR);
      }
      let insertData = new Todoitem();
      insertData.todoItem = params.todoItem;
      insertData.createDay = params.createDay;
      insertData.createMonth = params.createMonth;
      insertData.createYear = params.createYear;
      let data = await this.todoItemRepository.insert(insertData);
      return new ResultData<Object>()
        .setCode(ResultDataCode.success)
        .setData(data);
    }
    catch (error) {
      this.logger.error(error);
      console.log(error)
      return new ResultData<Object>()
        .setCode(ResultDataCode.error)
        .setErrCode(ResultDataErrString.DATABASE_ERR);
    }
  }
}
