import { Component, Input } from '@angular/core';
import { Task } from 'src/types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task!: Task;
  @Input() handlers!: {
    delete: (taskId: number) => void,
    edit: (taskId: number) => void,
    complete: (taskId: number) => void,
    returnToCurrent: (taskId: number) => void
  };

  constructor() { }

}
