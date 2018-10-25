// Core
import React, { PureComponent } from 'react';

// svg
import Checkbox from 'theme/assets/Checkbox.js';
import Edit from 'theme/assets/Edit.js';
import Star from 'theme/assets/Star.js';
import Remove from 'theme/assets/Remove.js';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {

    render () {
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = 'white'
                    />
                    <span>Hello</span>
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
}
