import { Controller, Get, Param, Query } from '@nestjs/common';
import { Todoitem } from 'src/model/todoitem.entity';
import { AppService } from '../services/app.service';

@Controller('/todoitem')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/getOneTodoItem')
  getOneTodoItem(@Query() params): Promise<Todoitem> {
    return this.appService.getOneTodoItem(params.id);
  }

  @Get('/getOneTodoItemByDay')
  getOneTodoItemByDay(@Query() params): Promise<Todoitem[]> {
    return this.appService.getOneTodoItemByDay(
      params.year, params.month, params.day, params.pageSize, params.pages);
  }
}
