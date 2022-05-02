import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todoitem } from 'src/model/todoitem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Todoitem])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
