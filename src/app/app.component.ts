import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/types';
import { getRandomNumber } from 'src/utils';

const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Task[] = [];
  editingTaskId: number | undefined;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.httpClient.get<Task[]>(API_URL)
      .subscribe(response => {
        for (let i = 0; i < 10; i++) {
          const task = response[getRandomNumber(response.length)];
          if (!this.tasks.includes(task)) {
            this.tasks.push(task);
          }
        }
      });
  }

  private refreshTask(task: Task) {
    const index = this.tasks.map(t => t.id).indexOf(task.id);
    this.tasks[index] = task;
  }

  getCurrentTasks() {
    return this.tasks
      .filter(task => !task.completed)
      .sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
  }

  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  completeTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.httpClient.put<Task>(API_URL + task.id, { ...task, id: 1, completed: true })
        .subscribe(response => {
          this.refreshTask({ ...response, id: task.id });
        });
    }
  }

  returnTaskToCurrent(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.httpClient.put<Task>(API_URL + task.id, { ...task, id: 1, completed: false })
        .subscribe(response => {
          this.refreshTask({ ...response, id: task.id });
        });
    }
  }

  editTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.editingTaskId = task.id;
    }
  }

  cancelEditTask() {
    this.editingTaskId = undefined;
  }

  updateTask(taskId: number, title: string) {
    if (!title) {
      return;
    }
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.httpClient.put<Task>(API_URL + task.id, { ...task, id: 1, title })
        .subscribe(response => {
          this.refreshTask({ ...response, id: task.id });
          this.cancelEditTask();
        });
    }
  }

  deleteTask(taskId: number) {
    this.httpClient.delete(API_URL + taskId)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
  }

  addTask(title: string) {
    if (!title) {
      return;
    }
    this.httpClient.post<Task>(API_URL, { title })
      .subscribe(response => {
        this.tasks.push(response);
      })
  }

}