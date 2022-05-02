import { Controller, Get, Param, Query } from '@nestjs/common';
import { Todoitem } from 'src/model/todoitem.entity';
import { AppService } from '../services/app.service';

@Controller('/todoitem')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getOneTodoItem')
  getOneTodoItem(@Query() params): Promise<Todoitem> {
    return this.appService.getOneTodoItem(params.id);
  }
}
