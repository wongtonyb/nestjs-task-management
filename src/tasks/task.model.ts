//defining the data model for a task entity

//Interface - (typescript concept) - enforces shape of data/object upon compilination,
//thus not preserved after compililation

//Class - part of javascript, can be used at runtime, - will be preserved after compililation
//good for multiple instances of same shape of data, good for OOP concepts, good for enhancing functionality

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
