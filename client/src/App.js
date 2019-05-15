import React, { Component } from "react";
import Todo from "./Todo";
import Table from "./Table";
import axios from "axios";

export default class App extends Component {
  state = {
    user: [],
    userDetails: {},
    submitted: false
  };
  componentDidMount() {
    axios.get("http://localhost:5000/UserDetails")
      .then(response => {
          this.setState({ userDetails: response.data });
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      axios.get("http://localhost:5000/UserDetails")
        .then(response => {
            this.setState({ userDetails: response.data, submitted: false });
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

    axios.post("http://localhost:5000/UserDetails", {
        name: user.name,
        age: user.age,
        uuid: uuid
      }
    )
      .then(response => {
          this.setState({ user: [...this.state.user, response.data], submitted: true });
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
