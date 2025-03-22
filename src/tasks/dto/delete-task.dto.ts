import { TaskStatus } from '../task.model';

export class DeleteTaskDto {
  id: string;
  status: TaskStatus;
}
