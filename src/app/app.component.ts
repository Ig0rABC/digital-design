import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Task = {
  id: number,
  title: string,
  completed: boolean
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Task[] = [];
  newTaskInput: string = "";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.httpClient.get<Task[]>(API_URL)
      .subscribe(response => {
        this.tasks = response.slice(0, 10);
      });
  }

  private refreshTask(task: Task) {
    const index = this.tasks.map(t => t.id).indexOf(task.id);
    this.tasks[index] = task;
  }

  getCurrentTasks() {
    return this.tasks.filter(task => !task.completed).sort();
  }

  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  completeTask(task: Task) {
    this.httpClient.put<Task>(API_URL + task.id, { ...task, completed: true })
      .subscribe(response => {
        this.refreshTask(response);
      });
  }

  returnTaskToCurrent(task: Task) {
    this.httpClient.put<Task>(API_URL + task.id, { ...task, completed: false })
      .subscribe(response => {
        this.refreshTask(response);
      });
  }

  editTask(task: Task) {
    console.log("EDIT", task.id, task.title);
  }

  updateTask(task: Task) {
    this.httpClient.put<Task>(API_URL + task.id, {
      ...task
    }).subscribe(response => {
      this.refreshTask(response);
    });
  }

  deleteTask(taskId: number) {
    this.httpClient.delete(API_URL + taskId)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
  }

  addTask() {
    this.httpClient.post<Task>(API_URL, {
      id: 10,
      title: this.newTaskInput,
      completed: false
    }).subscribe(response => {
      this.tasks.push(response);
      this.newTaskInput = "";
    })
  }

}
