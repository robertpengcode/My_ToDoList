import React, { Component } from "react";
import "./CreateTask.css";

class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      taskName: "",
      category: "",
      newCategory: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      await this.props.addTask({
        name: this.state.taskName,
        category: this.state.category,
        userId: this.state.userId
      });
      this.setState({
        userId: "",
        taskName: "",
        category: ""
      });
    } catch (ex) {
      console.log("error", ex.response.data.message);
    }
  }

  render() {
    const { onSubmit } = this;
    const { userId, taskName, category, newCategory } = this.state;
    const { users, categories, addCategory } = this.props;
    //console.log(this.state);

    return (
      <form className="createTaskForm" onSubmit={onSubmit}>
        <div className="formElement">
          <select
            id="userSelect"
            className="select"
            value={userId}
            onChange={ev => this.setState({ userId: ev.target.value })}
          >
            <option value="">--Select User--</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            className="input"
            id="taskInput"
            placeholder="New Task"
            value={taskName}
            onChange={ev => this.setState({ taskName: ev.target.value })}
          />
        </div>
        <div className="formElement">
          <select
            id="catSelect"
            className="select row2"
            value={category}
            onChange={ev => this.setState({ category: ev.target.value })}
          >
            <option value="" className="catSelectOpt">
              --Select Category--
            </option>
            {categories.map((category, id) => (
              <option value={category} key={id}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="input row2"
            placeholder="New Category"
            value={newCategory}
            onChange={ev => this.setState({ newCategory: ev.target.value })}
          />
          <button
            className="addButton row2"
            disabled={!newCategory}
            onClick={() => {
              addCategory(newCategory);
              this.setState({ newCategory: "" });
            }}
          >
            Add Category
          </button>
        </div>
        <div className="formElement">
          <button className="addButton" id="addTaskBtn" disabled={!taskName}>
            Create Task
          </button>
        </div>
      </form>
    );
  }
}

export default CreateTask;
