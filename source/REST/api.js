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

    // async createPost(comment) {
    //     const response = await fetch(MAIN_URL, {
    //         method:  'POST',
    //         headers: {
    //             authorization:  TOKEN,
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({comment}),
    //     });
    //
    //     if (response.status !== 200) {
    //         throw new Error('Post were not created.');
    //     }
    //     const {data: post } = await response.json();
    //
    //     return post;
    // }

    // async removePost(id) { // ф-я удаляет мои комменты
    //     const response = await fetch(`${ MAIN_URL }/${ id }`, {
    //         method:  'DELETE',
    //         headers: {
    //             authorization:  TOKEN,
    //             'content-type': 'application/json',
    //         },
    //     });
    //
    //     if (response.status !== 204) {
    //         throw new Error('Delete were not deleted.');
    //     }
    //     // const {data: post } = await response.json();
    //
    //     return true;
    // }

}();
