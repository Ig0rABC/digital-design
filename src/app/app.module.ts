import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NewTaskFormComponent,
    EditTaskFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
