import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent {

  input = "";

  @Input() add: (title: string) => void = () => { };

  addAndClear() {
    this.add(this.input);
    this.input = "";
  }

}
