# Тестовое задание для Digital Design

## Запуск

#### Node JS: https://nodejs.org

#### Angular CLI: `npm install -g @angular/cli`

#### `git clone https://github.com/Igor1py/digital-design`

#### `cd digital-design`

#### `ng serve`

Открыть http://localhost:4200 в браузере

## Описание

Все запросы на сервер находятся в `TasksService`, для чего импортировал `HttpClientModule` в `AppModule`, для работы с формами - `FormsModule`.

Методы для работы с заданиями находятся в `AppComponent` через шаблон я передаю их в дочерние компоненты.

#### Также, кроме `AppComponent`, выделил 3 отдельных компонента:
* для каждого задания `TaskComponent`,
* для создания новых заданий `NewTaskFormComponent`,
* для обновления названия задания `EditTaskFormComponent`

Панели с выполненными и невыполненными заданиями находятся в шаблоне `app`. У компонента есть 2 соответствующих метода для получения заданий: `getCurrentTasks` и `getCompletedTasks`.
 
ID редактируемого задания находится в `app`. В его шаблоне проверяется `task.id === editingTaskId`, если да, то получаем `app-edit-task-form`, если нет `app-task`.

Для кнопок написал 2 основных класса: `filled-button` и `contained-button`, которые можно наследовать и расширять.
