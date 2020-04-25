import React, { Component } from 'react';
import './Tasks.css';

class Tasks extends Component{

    constructor() {
        super()
    }

    render() {
        const {tasks} = this.props;
        console.log('tasks', tasks);
        return (
            <div>
                <p>tasks here</p>
                <ul>
                    { tasks.map(task => <li key={task.id}>{task.name}</li>) }
                </ul>
            </div>
        )
    }

}

export default Tasks;

