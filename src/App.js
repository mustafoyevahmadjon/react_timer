import React from "react";
import './App.css'

export default class App extends React.Component {
  state = {
    count: 0,
    isCounting: false,
  };

  componentDidMount() {
    console.log('componentDidMount');
    const userCount = localStorage.getItem("timer")
    if(userCount) {
      this.setState({count: +userCount})
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    localStorage.setItem("timer", this.state.count)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
    clearInterval(this.counterId)
  }

  handleStart = () => {
    this.setState({isCounting: true})

    this.counterId = setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000) 
  }

  handleStop = () => {
    this.setState({isCounting: false})
    clearInterval(this.counterId)
  }

  handleReset = () => {
    this.setState({isCounting: false, count: 0})
    clearInterval(this.counterId)
  }

  render() {
    return (
      <div className="App">
        <p>React Timer</p>
        <p>{this.state.count}</p>
        {!this.state.isCounting ? (
          <button className="success" onClick={this.handleStart}>
            Start
          </button>
        ) : (
          <button className="danger" onClick={this.handleStop}>
            Stop
          </button>
        )}
        <button className="secondary" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}
