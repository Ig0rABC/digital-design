import { Component, Input } from '@angular/core';
import { Task } from 'src/types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task = {
    id: 0,
    title: "NO TITLE",
    completed: false
  };
  @Input() edit: (taskId: number) => void = () => { };
  @Input() delete: (taskId: number) => void = () => { };
  @Input() complete: (taskId: number) => void = () => { };
  @Input() returnToCurrent: (taskId: number) => void = () => { };

  constructor() { }

}