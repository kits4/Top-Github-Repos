import "./App.css";
import React from "react";
function FriendsList(props) {
  return (
    <div>
      <div className="app">
        <h1>Active Friends</h1>
      </div>
      <div className="app">
        <div className="ui middle aligned divided list">
          {props.friends.map((friend) => (
            <div className="item" key={friend}>
              <span
                className="content"
                style={{
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                }}
              >
                {friend}
              </span>
              <div className="right floated content">
                <button
                  className="ui button mini"
                  onClick={() => props.onRemoveFriend(friend)}
                >
                  Delete
                </button>
                <button
                  className="ui button mini"
                  onClick={() => props.onDeactive(friend)}
                >
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="app">
        <h1>Inactive Friends</h1>
      </div>
      <div className="app">
        <div className="ui middle aligned divided list">
          {props.inactive.map((friend) => (
            <div className="item" key={friend}>
              <span
                className="content"
                style={{
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                }}
              >
                {friend}
              </span>
              <div className="right floated content">
                <button
                  className="ui button mini"
                  onClick={() => props.onRemoveFriend(friend)}
                >
                  Delete
                </button>
                <button
                  className="ui button mini"
                  onClick={() => props.onActive(friend)}
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: ["Ketan", "Shubham", "Huzaifa", "Dhairya"],
      inactive: [],
      input: "",
    };
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.active = this.active.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  handleAddFriend() {
    if (this.state.input !== "") {
      if (!this.state.friends.includes(this.state.input)) {
        this.setState((currentState) => ({
          friends: currentState.friends.concat([this.state.input]),
          input: "",
        }));
      } else {
        alert("Please try something else!!!");
      }
    } else {
      alert("Please Enter Something!!!");
    }
  }
  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => friend !== name),
        inactive: currentState.inactive.filter((friend) => friend !== name),
      };
    });
  }

  updateInput(e) {
    const value = e.target.value;
    this.setState({
      input: value,
    });
  }

  deactivate(name) {
    this.setState((currentState) => ({
      friends: currentState.friends.filter((friend) => friend !== name),
      inactive: currentState.inactive.concat([name]),
    }));
  }
  active(name) {
    this.setState((currentState) => ({
      friends: currentState.friends.concat([name]),
      inactive: currentState.inactive.filter((in1) => in1 !== name),
    }));
  }
  clearAll(e) {
    this.setState({
      friends: [],
      inactive: [],
      input: "",
    });
  }

  render() {
    return (
      <div>
        <div className="app">
          <div
            className=" ui left icon input focus"
            style={{ margin: "5px", width: "272px" }}
          >
            <input
              type="text"
              placeholder="Add a new Friend"
              value={this.state.input}
              onChange={this.updateInput}
            />
            <i className="users icon"></i>
          </div>
        </div>
        <div className="app">
          <div>
            <button className="ui button" onClick={this.handleAddFriend}>
              <i className="icon user"></i>
              Add Friend
            </button>
            <button className="ui button" onClick={this.clearAll}>
              <i className="icon trash"></i>
              Clear All
            </button>
          </div>
        </div>

        <FriendsList
          friends={this.state.friends}
          inactive={this.state.inactive}
          onRemoveFriend={this.handleRemoveFriend}
          onDeactive={this.deactivate}
          onActive={this.active}
        />
      </div>
    );
  }
}

export default App;
