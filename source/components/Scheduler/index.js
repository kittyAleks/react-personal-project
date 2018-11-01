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
        this._setTasksFetchingState(true);
        const tasks = await api.fetchTasks();

        this.setState({ tasks });
    } catch ({ message }) {
        console.log(message);
    } finally {
        this._setTasksFetchingState(false);
    }
    //console.timeEnd("_fetchTasksAsync");
};

_createTaskAsync = async () => {
    try {
        this._setTasksFetchingState(true);
    //const tasks = await api.fetchTasks();

    //this.setState({ tasks });
    } catch ({ message }) {
        console.log(message);
    } finally {
        this._setTasksFetchingState(false);
    }
}

_handleSubmit = (event) => {
    event.preventDefault(); // при нажатии button блокирует станд-е поведение перезагрузки страницы
    const { newTaskMessage } = this.state;

    if (newTaskMessage) {
        this.setState(({ tasks }) => ({
            tasks:          [{ message: newTaskMessage }, ...tasks],
            newTaskMessage: '',
        }));
    }
}

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
                    <form onSubmit = { this._handleSubmit }>
                        <input type = 'text' value = { newTaskMessage } onChange = { this._updateNewTaskMessage } />
                        <button>Добавить задачу</button>
                    </form>
                    <ul>
                        {
                            tasks.map((task, index) => {
                                return <Task key = { index } { ...task } />;
                            })
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
