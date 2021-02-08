import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent {

  input = "";

  @Input() handler?: (title: string) => void;

  add() {
    console.log("ADD METHOD");
    if (this.handler) {
      console.log(true);
      this.handler(this.input);
    } else {
      console.log(false);
    }
    this.input = "";
  }

}
