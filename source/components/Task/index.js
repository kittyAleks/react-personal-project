// Core
import React, { PureComponent } from 'react';
///import cx from 'classnames';

// svg
import Checkbox from 'theme/assets/Checkbox.js';
import Edit from 'theme/assets/Edit.js';
import Star from 'theme/assets/Star.js';
import Remove from 'theme/assets/Remove.js';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {

<<<<<<< HEAD
  _removeTask = () => this.props._removeTaskAsync(this.props.id);

  _toggleTaskFavoriteState = () => {
      const { _updateTaskAsync, id, message, completed, favorite } = this.props;

      _updateTaskAsync([
          {
              id,
              message,
              completed,
              favorite: !favorite,
          }
      ]);
  }
  _toggleTaskCompletedState = () => {
      const { _updateTaskAsync, id, message, completed, favorite } = this.props;

      _updateTaskAsync([
          {
              id,
              message,
              completed: !completed,
              favorite,
          }
      ]);
  }

  render () {
      const { message, favorite, completed } = this.props;

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
                  <span>{message}</span>

              </div>
              <div className = { Styles.actions }>
                  <Star
                      checked = { favorite }
                      color1 = '#3B8EF3'
                      color2 = 'black'
                      onClick = { this._toggleTaskFavoriteState }
                  />
                  <Edit
                      color1 = '#3B8EF3'
                      color2 = 'black'
                  />
                  <Remove
                      color1 = '#3B8EF3'
                      color2 = 'black'
                      onClick = { this._removeTask }
                  />
              </div>
          </li>
      );

  }
=======
    render () {
        const { message, completed } = this.props;

/*
        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

*/
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = 'white'
                    />
                    <span>{message}</span>

                </div>
                <div className = { Styles.actions }>
                    <Star
                        color1 = '#3B8EF3'
                        color2 = 'black'
                    />
                    <Edit
                        color1 = '#3B8EF3'
                        color2 = 'black'
                    />
                    <Remove
                        color1 = '#3B8EF3'
                        color2 = 'black'
                    />
                </div>
            </li>
        );

    }
>>>>>>> a4ef56c69253f39a45f13b1607dbb4a2973071c4
}
