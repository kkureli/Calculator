import "./App.css";
import React, { Component } from "react";
import { Animated } from "react-animated-css";

export default class App extends Component {
  state = {
    currentNum: ["0"],
    operation: null,
    opsPressed: 0,
    added: 0,
    numFirst: [],
    isVisible: false,
    fade: false,
    sevenPressed: false
  };

  componentDidMount() {
    let nums = document.getElementsByClassName("num");
    let arry = [...nums];

    arry.forEach(element => {
      element.addEventListener("click", () => {
        this.numPressed(element);
      });
    });

    let ops = document.getElementsByClassName("opsBtn");
    let arrOps = [...ops];
    arrOps.forEach(element => {
      element.addEventListener("click", () => {
        this.opsPressed(element);
      });
    });
  }

  clearBtn = () => {
    this.setState({ count: [], currentNum: ["0"], opsPressed: 0, added: 0 });
  };

  numPressed = element => {
    if (element.innerHTML === "7") {
      this.setState({ sevenPressed: true });
    }
    if (this.state.currentNum[0] === "0") {
      // console.log(element.innerHTML);
      this.setState({ ...this.state, currentNum: [element.innerHTML] });
    } else {
      if (this.state.opsPressed !== 0) {
        // console.log(element.innerHTML);
        if (this.state.added === 0) {
          this.setState({
            ...this.state,
            currentNum: [element.innerHTML],
            added: 1
          });
        } else if (this.state.added !== 0) {
          let updatedState = { ...this.state };
          updatedState.currentNum.push(element.innerHTML);

          return this.setState({
            ...this.state,
            currentNum: updatedState.currentNum
          });
        }
      } else {
        let updatedState = { ...this.state };
        updatedState.currentNum.push(element.innerHTML);

        this.setState({ ...this.state, currentNum: updatedState.currentNum });
      }
    }
  };

  opsPressed = element => {
    let opsPressNo = this.state.opsPressed;
    opsPressNo = opsPressNo + 1;
    let total = 0;
    if (this.state.opsPressed > 0) {
      console.log(this.state.operation);

      if (this.state.operation === "+") {
        console.log("sum");
        console.log(
          parseInt(this.state.numFirst.join("")),
          parseInt(this.state.currentNum.join(""))
        );

        total =
          parseInt(this.state.numFirst.join("")) +
          parseInt(this.state.currentNum.join(""));
      }

      if (this.state.operation === "-") {
        total =
          parseInt(this.state.numFirst.join("")) -
          parseInt(this.state.currentNum.join(""));
      }
      if (this.state.operation === "*") {
        total =
          parseInt(this.state.numFirst.join("")) *
          parseInt(this.state.currentNum.join(""));
      }
      if (this.state.operation === "%") {
        total =
          parseInt(this.state.numFirst.join("")) %
          parseInt(this.state.currentNum.join(""));
      }
      if (this.state.operation === "/") {
        total =
          parseInt(this.state.numFirst.join("")) /
          parseInt(this.state.currentNum.join(""));
      }

      if (this.state.operation === "=") {
        total = this.state.currentNum.join("");
      }

      this.setState({
        ...this.state,
        operation: element.innerHTML,
        count: [this.state.currentNum, element.innerHTML],
        opsPressed: opsPressNo,
        added: 0,
        currentNum: total.toString().split(""),
        numFirst: total.toString().split("")

        // opsPressed: opsPressNo
      });
    } else {
      let numFirst = this.state.currentNum;
      console.log(numFirst);

      this.setState({
        ...this.state,
        operation: element.innerHTML,
        count: [this.state.currentNum, element.innerHTML],
        opsPressed: opsPressNo,
        added: 0,
        numFirst: numFirst

        // opsPressed: opsPressNo
      });
      console.log(this.state);
    }
  };

  render() {
    return (
      <div class="container">
        <div class="row result">
          <div class="resultCol col">{this.state.currentNum}</div>
        </div>
        <div className="buttons">
          <div class="row">
            <div onClick={this.clearBtn} class="col-3 col  clear">
              clear
            </div>
            <div class="col-3 col num  ">0</div>
            <div class="col-3 col opsBtn">*</div>
            <div class="col-3 col opsBtn">/</div>
          </div>
          <div class="row">
            <div class="col num ">7</div>

            <div class="col num">8</div>
            <div class="col num">9</div>
            <div class="col opsBtn">-</div>
          </div>
          <div class="row">
            <div class="col num">4</div>
            <div class="col num">5</div>
            <div class="col num">6</div>
            <div class="col opsBtn">+</div>
          </div>
          <div class="row">
            <div class="col num ">1</div>
            <div class="col num">2</div>
            <div class="col num">3</div>
            <div class="col opsBtn">=</div>
          </div>
        </div>
      </div>
    );
  }
}
