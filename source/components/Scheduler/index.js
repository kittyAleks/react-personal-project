// Core
import React, { Component } from 'react';

// Components
import Task from 'components/Task';

//Svg
import Checkbox from 'theme/assets/Checkbox.js';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
  state = {
      text: '',
  }

_handleChangeText = (event) => this.setState({ text: event.target.value });

_handleCreateTask = () => {

}

render () {
    const { text } = this.state;

    return (
        <section className = { Styles.scheduler }>
            <main>
                <header>
                    <h1>Планировщик задач</h1>
                    <input />
                </header>
                <section>
                    <form>
                        <input type = 'text' value = { text } onChange = { this._handleChangeText } />
                        <button onClick = { this._handleCreateTask }>Добавить задачу</button>
                    </form>
                    <ul>
                        <Task />
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
