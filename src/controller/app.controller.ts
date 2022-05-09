import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Todoitem } from 'src/model/todoitem.entity';
import { AppService } from '../services/app.service';
import { ResultData } from 'src/utils/returnDataUtil';
import { Console } from 'console';
import { addOneTodoItemDto } from 'src/dto/addOneTodoItemDto';
@Controller('/todoitem')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/getOneTodoItem')
  getOneTodoItem(@Query() params): Promise<ResultData<Todoitem>> {
    return this.appService.getOneTodoItem(params.id);
  }

  @Get('/getTodoItemByDay')
  getTodoItemByDay(@Query() params): Promise<ResultData<Todoitem[]>> {
    return this.appService.getTodoItemByDay(
      params.year, params.month, params.day, params.pageSize, params.pages);
  }

  @Get('/getTodoItemByMonth')
  getTodoItemByMonth(@Query() params): Promise<ResultData<Todoitem[]>> {
    return this.appService.getTodoItemByMonth(
      params.year, params.month, params.pageSize, params.pages);
  }

  @Get('/getTodoItemByYear')
  getTodoItemByYear(@Query() params): Promise<ResultData<Todoitem[]>> {
    return this.appService.getTodoItemByYear(
      params.year, params.pageSize, params.pages);
  }

  @Post('/addOneTodoItem')
  addOneTodoItem(@Body() params: addOneTodoItemDto): Promise<ResultData<Object>>{
    return this.appService.addOneTodoItem(params);
  }
}
