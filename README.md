# Тестовое задание для Digital Design

## Запуск

#### Node JS: https://nodejs.org

#### Angular CLI: `npm install -g @angular/cli`

#### `git clone https://github.com/Igor1py/digital-design`

#### `cd digital-design`

#### `ng serve`

Открыть http://localhost:4200 в браузере

## Описание

Все запросы на сервер находятся в главном компоненте `app`, для чего импортировал `HttpClientModule`. Для работы с формами `FormsModule`.

#### Выделил 3 отдельных компонента:
* для каждого задания `task`,
* для создания новых заданий `new-task-form`,
* для обновления названия задания `edit-task-form`

Панели с выполненными и невыполненными заданиями находятся в шаблоне `app`. У компонента есть 2 соответствующих метода: `getCurrentTasks` и `getCompletedTasks`.
 
ID редактируемого задания находится в `app`. В его шаблоне проверяется `task.id === editingTaskId`, если да, то получаем `edit-task-form`, если нет `task`.

Для кнопок написал 2 основных класса: `filled-button` и `contained-button`, которые можно наследовать и расширять.
