//Instruments
import { MAIN_URL, TOKEN } from './config';

export default new class Api {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error('Tasks fetching failed.');
        }

        const { data } = await response.json();

        return data;
    }
    //--------------------------------------------------------------
    async createTask (message) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.status !== 200) {
            throw new Error('Create task failed');
        }
        const { data } = await response.json();

        return data;
    }
    //--------------------------------------------------------------

    async removeTask (id) { // ф-я удаляет мои todo
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('Task were not deleted.');
        }

        return true;
    }

    async updateTask (arr) {
        const response = await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify(arr),
        });

        if (response.status !== 200) {
            throw new Error('Update task failed');
        }
        const { data } = await response.json();

        return data;
    }

}();
