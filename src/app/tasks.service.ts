import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/types';
import { getRandomNumber } from 'src/utils';

const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async get() {
    const tasks: Task[] = [];
    const responseTasks = await this.httpClient.get<Task[]>(API_URL).toPromise();
    for (let i = 0; i < 10;) {
      const task = responseTasks[getRandomNumber(responseTasks.length)];
      if (!tasks.includes(task)) {
        tasks.push(task);
        i++;
      }
    }
    return tasks;
  }

  create(title: string) {
    return this.httpClient.post<Task>(API_URL, { title }).toPromise();
  }

  async update(task: Task) {
    if (task.id > 200) {
      const updatedTask = await this.httpClient.put<Task>(API_URL + 1, { ...task, id: 1 }).toPromise();
      return { ...updatedTask, id: task.id };
    }
    return this.httpClient.put<Task>(API_URL + task.id, task).toPromise();
  }

  delete(taskId: number) {
    return this.httpClient.delete(API_URL + taskId).toPromise();
  }

}
