// Core
import React, { Component } from 'react';

// Components
import Task from 'components/Task';
import Spinner from "components/Spinner";

//Svg
import Checkbox from 'theme/assets/Checkbox.js';

// Instruments
import Styles from './styles.m.css';
import api from 'REST/api.js';

export default class Scheduler extends Component {
  state = {
      tasksFilter:     '',
      newTaskMessage:  '',
      isTasksFetching: false,
      tasks:           [],
  }

  componentDidMount () {
      this._fetchTasksAsync();
  }

_updateTasksFilter = (event) => this.setState({ tasksFilter: event.target.value.toLocaleLowerCase() });

_updateNewTaskMessage = (event) => this.setState({ newTaskMessage: event.target.value });

_setTasksFetchingState = (isTasksFetching) => this.setState({ isTasksFetching }); // метод крутит спинер

_fetchTasksAsync = async () => {
    //console.time("_fetchTasksAsync") time - проверяет сколько работает ф-я от и до
    try {
        this._setTasksFetchingState(true); // начинаем крутить спинер
        const tasks = await api.fetchTasks();

        this.setState({ tasks });
    } catch ({ message }) {
        console.log(message);
    } finally {
        this._setTasksFetchingState(false); // прекращаем крутить спинер
    }
    //console.timeEnd("_fetchTasksAsync");
};

_createTaskAsync = async (event) => {
    event.preventDefault(); // при нажатии button блокирует станд-е поведение перезагрузки страницы
    const { newTaskMessage } = this.state;

    if (newTaskMessage) {
        try {
            this._setTasksFetchingState(true);
            const task = await api.createTask(newTaskMessage);

            this.setState((state) => ({
                tasks:          [task, ...state.tasks],
                newTaskMessage: '',
            }));
        } catch ({ message }) {
            console.log(message);
        } finally {
            this._setTasksFetchingState(false);
        }
    }

    return null;
}

_removeTaskAsync = async (id) => {
    try {
        this._setTasksFetchingState(true);
        await api.removeTask(id);

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== id),
        }));

    } catch ({ message }) {
        console.log(message);
    } finally {
        this._setTasksFetchingState(false);
    }

    return null;
}

_updateTaskAsync = async (arr) => {
    try {
        this._setTasksFetchingState(true);
        const data = await api.updateTask(arr);

        this.setState(({ tasks }) => ({
            tasks: tasks.map((task) => {
                if (data[0].id === task.id) {
                    return data[0];
                }

                return task;
            }),
        }));

    } catch ({ message }) {
        console.log(message);
    } finally {
        this._setTasksFetchingState(false);
    }

    return null;
}

// _handleSubmit = (event) => {
//
//     if (newTaskMessage) {

//     }
// }

render () {
    const { newTaskMessage, tasksFilter, isTasksFetching, tasks } = this.state;

    return (
        <section className = { Styles.scheduler }>
            { isTasksFetching && <Spinner /> }
            <main>
                <header>
                    <h1>Планировщик задач</h1>
                    <input value = { tasksFilter } onChange = { this._updateTasksFilter } />
                </header>
                <section>
                    <form onSubmit = { this._createTaskAsync }>
                        <input type = 'text' value = { newTaskMessage } onChange = { this._updateNewTaskMessage } />
                        <button>Добавить задачу</button>
                    </form>
                    <ul>
                        {
                            tasks.map((task) => (
                                <Task
                                    key = { task.id }
                                    { ...task }
                                    _removeTaskAsync = { this._removeTaskAsync }
                                    _updateTaskAsync = { this._updateTaskAsync }
                                />)
                            )
                        }
                    </ul>
                </section>
                <footer>
                    <div>
                        <Checkbox
                            color1 = 'black'
                            color2 = 'white'
                        />
                    </div>
                    <span>Все задачи выполнены</span>
                </footer>
            </main>
        </section>
    );
}
}
