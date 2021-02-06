import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Task = {
  id: number,
  title: string,
  completed: boolean
}

const API_URL = 'https://jsonplaceholder.typicode.com/users/1/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks = [] as Task[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.httpClient.get<Task[]>(API_URL)
      .subscribe(response => {
        this.tasks = response.slice(10);
      });
  }

  getCurrentTasks() {
    return this.tasks.filter(task => !task.completed).sort();
  }

  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  completeTask(taskId: number) {
    // REQUEST with PUT method
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  returnTaskToCurrent(taskId: number) {
    // REQUEST with PUT method
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = false;
    }
  }

  editTask(task: Task) {
    // REQUEST with PUT method
    console.log("EDIT", task.id, task.title);
  }

  deleteTask(taskId: number) {
    // REQUEST with DELETE method
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

}
