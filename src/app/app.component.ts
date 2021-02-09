import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Task[] = [];
  editingTaskId: number | undefined;

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.fetchTasks();
  }

  async fetchTasks() {
    this.tasks = await this.tasksService.get();
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

  async completeTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = await this.tasksService.update({ ...task, completed: true });
      this.refreshTask(updatedTask);
    }
  }

  async returnTaskToCurrent(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = await this.tasksService.update({ ...task, completed: false });
      this.refreshTask(updatedTask);
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

  async updateTask(taskId: number, title: string) {
    if (!title) {
      return;
    }
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = await this.tasksService.update({ ...task, title });
      this.refreshTask(updatedTask);
      this.cancelEditTask();
    }
  }

  async deleteTask(taskId: number) {
    await this.tasksService.delete(taskId);
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  async addTask(title: string) {
    if (!title) {
      return;
    }
    const task = await this.tasksService.create(title);
    this.tasks.push(task);
  }

}