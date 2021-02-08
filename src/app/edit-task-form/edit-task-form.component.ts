import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent {

  @Input() input: string = "";
  @Input() taskId: number = 0;
  @Input() update: (taskId: number, title: string) => void = () => { };
  @Input() cancel: () => void = () => { };

}