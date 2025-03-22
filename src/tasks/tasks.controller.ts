import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
  /**
     * typical way of defining class constructor
     * 
        taskService: TasksService;

        constructor(taskService: TasksService) {
            this.taskService = taskService;
        }

        helloWorld() {
            console.log(this.taskService);
        }
     */

  // using the shorthand syntax to define and assign class properties in the constructor
  // taskService is a private property of the class and can be used in all methods of the class
  constructor(private taskService: TasksService) {}

  //GET /tasks handler
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      //if filterDto has any properties, then filter tasks accordingly
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      //else return all tasks without any filters
      return this.taskService.getAllTasks();
    }
  }

  //GET /tasks/:id handler
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | undefined {
    return this.taskService.getTaskById(id);
  }

  //POST /tasks handler
  //@Body() body - creates risks of unwanted data being passed to the backend, hence use DTOs (Data Transfer Objects)
  //the following extracts only the required data from the body of the request (title and description)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  //Patch best practice
  // 1. refer to the task by id
  // 2. specify what has to be updated (status)
  // 3. provide required parameters (id and status) in the request body
  //   @Patch('/:id/status')
  //   updateTaskStatus(@Body() deleteTaskDto: DeleteTaskDto): Task | void {
  //     return this.taskService.updateTaskStatus(deleteTaskDto);
  //   }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task | undefined {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
}
