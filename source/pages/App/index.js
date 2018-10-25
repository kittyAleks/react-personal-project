// Core
import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Spinner from "components/Spinner";
import Scheduler from "components/Scheduler";

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Fragment>
                <Spinner />
                <Scheduler />
            123
            </Fragment>

        );
    }
}
