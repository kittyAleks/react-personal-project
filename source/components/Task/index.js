// Core
import React, { PureComponent } from 'react';

// svg
import Checkbox from 'theme/assets/Checkbox.js';
import Edit from 'theme/assets/Edit.js';
import EditClose from 'theme/assets/EditClose.js';
import Star from 'theme/assets/Star.js';
import Remove from 'theme/assets/Remove.js';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            isEditMode: false,
            message:    this.props.message,
        };
        this.input = React.createRef();
    }

  _removeTask = () => this.props._removeTaskAsync(this.props.id);

  _toggleTaskFavoriteState = () => {
      const { message } = this.state;
      const { _updateTaskAsync, id, completed, favorite } = this.props;

      _updateTaskAsync([
          {
              id,
              message,
              completed,
              favorite: !favorite,
          }
      ]);
  };

    _toggleTaskCompletedState = () => {
        const { message } = this.state;
        const { _updateTaskAsync, id, completed, favorite } = this.props;

        _updateTaskAsync([
            {
                id,
                message,
                completed: !completed,
                favorite,
            }
        ]);
    };

    _openEditMode = () => this.setState({ isEditMode: true }, () => this.input.current && this.input.current.focus());

    _closeEditMode = () => this.state.message && this.setState({ isEditMode: false });

    _onChangeHandler = (event) => event.target.value.length <= 50 &&
        this.setState({ message: event.target.value })

    _editTaskMessage = () => { //ф-я отправляет запрос на сервер для изменения сообщения todo
        const { message } = this.state;

        if (message) {
            const { _updateTaskAsync, id, completed, favorite } = this.props;

            _updateTaskAsync([
                {
                    id,
                    message,
                    completed,
                    favorite,
                }
            ]);

            this._closeEditMode();
        }
    }

    render () {
        const { isEditMode, message } = this.state;
        const { favorite, completed } = this.props;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = 'white'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    {
                        // TODO: прочитать про React Ref https://reactjs.org/docs/refs-and-the-dom.html
                        // обратить внимание на обработчики onDoubleClick && onBlur
                        isEditMode
                            ? <input
                                ref = { this.input }
                                style = { { width: "100%" } }
                                value = { message }
                                onBlur = { this._editTaskMessage }
                                onChange = { this._onChangeHandler }
                            />
                            : <span onDoubleClick = { this._openEditMode }>{message}</span>
                    }
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        color1 = '#3B8EF3'
                        color2 = 'black'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    {
                        isEditMode
                            ? <EditClose
                                color1 = '#3B8EF3'
                                color2 = 'red'
                                onClick = { this._closeEditMode }
                            />
                            : <Edit
                                color1 = '#3B8EF3'
                                color2 = 'black'
                                onClick = { this._openEditMode }
                            />
                    }
                    <Remove
                        color1 = '#3B8EF3'
                        color2 = 'black'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );

    }
}
