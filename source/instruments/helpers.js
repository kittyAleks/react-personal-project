// Core
import moment from 'moment';
import { v4 } from 'uuid';

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const sortTasksByDate = (tasks) => {
    return tasks.sort((task1, task2) => {
        if (moment(task1.created).unix() < moment(task2.created).unix()) {
            return 1;
        } else if (
            moment(task1.created).unix() > moment(task2.created).unix()
        ) {
            return -1;
        }

        return 0;
    });
};

export class BaseTaskModel {
    constructor (
        id = v4(),
        completed = false,
        favorite = false,
        message = 'Выполнить важную задачу (создано в конструкторе).',
    ) {
        this.id = id;
        this.completed = completed;
        this.favorite = favorite;
        this.message = message;
    }
}
