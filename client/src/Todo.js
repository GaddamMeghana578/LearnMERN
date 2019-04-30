import React, { Component } from "react";

export default class Todo extends Component {
  state = {
    name: "",
    age: ""
  };

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({ name: "", age: "" });
  };
  render() {
    const { age, name } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="form-group col-md-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              id="name"
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className=" form-group col-md-1">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              className="form-control"
              name="age"
              value={age}
              onChange={e => this.handleInputChange(e)}
              id="age"
            />
          </div>
        </div>
        <button
          className="btn btn-warning"
          onClick={e => this.handleSubmitForm(e)}
        >
          Submit
        </button>
      </div>
    );
  }
}
