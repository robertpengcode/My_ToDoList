import React, { Component } from "react";
import { Redirect, Switch, HashRouter, Route, Link } from "react-router-dom";
import axios from "axios";

import "./App.css";
import CreateTask from "./CreateTask";
import Users from "./Users";
import Tasks from "./Tasks";
import SingleUser from "./SingleUser";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      tasks: [],
      categories: []
    };
    this.addTask = this.addTask.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  async componentDidMount() {
    const users = (await axios.get("/api/users")).data;
    const tasks = (await axios.get("/api/tasks")).data;
    this.setState({ users });
    this.setState({ tasks });
    if (this.state.tasks.length) {
      const categories = [
        ...new Set(this.state.tasks.map(task => task.category))
      ];
      this.setState({ categories });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks.length !== this.state.tasks.length) {
      const users = (await axios.get("/api/users")).data;
      this.setState({ users });
    }
  }

  async addTask(newTask) {
    //console.log("call me!", newTask);
    const addedTask = (await axios.post("/api/tasks", newTask)).data;
    //console.log("1", addedTask);
    const updatedTasks = [...this.state.tasks, addedTask];
    //console.log("2", updatedTasks);
    this.setState({ tasks: updatedTasks });
  }

  addCategory(newCategory) {
    let newCategories = [...this.state.categories, newCategory];
    this.setState({ categories: newCategories });
  }

  render() {
    const { users, tasks, categories } = this.state;
    //console.log("3", users, tasks);
    const { addTask, addCategory } = this;
    return (
      <div className="App">
        <HashRouter>
          <h1>My To Do List</h1>
          <CreateTask
            addTask={addTask}
            addCategory={addCategory}
            users={users}
            tasks={tasks}
            categories={categories}
          />
          <Route exact path="/" render={() => <Users users={users} />} />
          <Switch>
            <Route
              path="/users/:id"
              render={props => <SingleUser props={props} />}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
