import React, { Component } from "react";
import Todo from "./Todo";
import Table from "./Table";

export default class App extends Component {
  state = {
    user: [],
    userDetails: {},
    submitted: false
  };
  componentDidMount() {
    fetch("http://localhost:5000/UserDetails")
      .then(response => {
        response.json().then(data => {
          this.setState({ userDetails: data });
        });
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      fetch("http://localhost:5000/UserDetails")
        .then(response => {
          response.json().then(data => {
            this.setState({ userDetails: data, submitted: false });
          });
        })
        .catch(error => console.log(error));
    }
  }

  handleSubmit = user => {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    var userData = {
      name: user.name,
      age: user.age,
      uuid: uuid
    };
    fetch("http://localhost:5000/UserDetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        response.json().then(body => {
          this.setState({ user: [...this.state.user, body], submitted: true });
        });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="App">
        <h1>&nbsp;&nbsp;User Details</h1>
        <Todo handleSubmit={this.handleSubmit} />
        <br />
        <Table userDetails={this.state.userDetails} />
      </div>
    );
  }
}
