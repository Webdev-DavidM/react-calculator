import React, { Component } from "react";
import Display from "./display";
import styles from "./calculator.module.css";
import Buttons from "./buttons";
import validInput from "./validationInput";

export default class Calculator extends Component {
  state = {
    sums: [],
    total: "0",
    display: "0",
  };

  updateSums(userInput) {
    this.setState((prevState) => {
      if (prevState.sums.length === 1) {
        return {
          ...prevState,
          display: userInput,
        };
      } else {
        return { sums: [...prevState.sums, prevState.display, userInput] };
      }
    });
  }

  clearDisplay() {
    this.setState((prevState) => {
      return {
        ...prevState,
        display: "",
      };
    });
  }

  getTotal() {
    this.setState((prevState) => {
      //he here i get the prevState and pass it to the final calculation function
      let results = this.finalCalculation(prevState.sums);
      results = results.toString().includes(".")
        ? results.toFixed(2)
        : results.toString();

      return {
        ...prevState,
        total: results,
        sums: [results],
        display: results,
      };
    });
  }

  resetDisplay() {
    this.setState({
      total: "0",
      display: "0",
      sums: [],
    });
  }

  updateDisplay = (input) => {
    this.setState((prevState) => {
      if (prevState.total !== "0") {
        return {
          ...prevState,
          sums: [prevState.total, input],
          display: input,
        };
      }

      return {
        ...prevState,
        display: prevState.display + input,
      };
    });
  };

  buttonClicked = (e) => {
    if (!validInput(e, this.state.display)) {
      return;
    }
    let userInput = e.target.textContent;
    switch (userInput) {
      case "=":
        if (this.state.sums.length > 1) {
          this.updateSums("=");
          this.clearDisplay();
          this.getTotal();
          return;
        }
        return;

      case ".":
        e.persist();
        return this.setState((prevState) => {
          if (
            prevState.sums.length > 1 &&
            ["x", "/", "+"].includes(prevState.display) === true
          ) {
            return {
              display: e.target.textContent,
            };
          } else {
            return {
              display: prevState.display + e.target.textContent,
            };
          }
        });

      case "ac":
        return this.resetDisplay();

      case "+":
        this.updateSums("+");
        this.clearDisplay();
        return this.updateDisplay("+");

      case "-":
        // This is check if an operator io already in the array and if so then it will clear this operator and return the - into the display, if not it will add the number to the calculation
        e.persist();
        return this.setState((prevState) => {
          if (["+", "x", "/"].includes(prevState.display)) {
            this.clearDisplay();
            this.updateDisplay("-");
          } else {
            return {
              ...prevState,
              sums: [...prevState.sums, prevState.display, userInput],
              display: e.target.textContent,
            };
          }
        });

      case "x":
        this.updateSums("x");
        this.clearDisplay();
        return this.updateDisplay("x");

      case "/":
        this.updateSums("/");
        this.clearDisplay();
        return this.updateDisplay("/");

      default:
        // as I need to use the event within the callback I need to use e.persist so I can use it in there.
        e.persist();
        return this.setState((prevState) => {
          if (
            (["-"].includes(prevState.display) &&
              ["/", "x", "+"].includes(
                prevState.sums[prevState.sums.length - 1]
              )) ||
            ["/", "x", "+", "-", "0"].includes(prevState.display) === false
          ) {
            return { display: prevState.display + e.target.textContent };
          } else {
            return { display: e.target.textContent };
          }
        });
    }
  };

  // Here a final calculation is worked out and returned to be displayed.

  finalCalculation = (sums) => {
    // My calculator will allow any number of calculations before you press =, this is done by putting all the numbers in an array and working through them one at a time, splice off each calculation and then adding it back to the  array. if the array is less than 3 there is no more calculations to be done.
    let finalCalc = 0;
    let sumArray = [...sums];
    this.setState({ sums: sums });

    while (sumArray.length > 3) {
      const sumArrayCalc = sumArray.splice(0, 3);
      const number1 = Number(sumArrayCalc[0]);
      const number2 = Number(sumArrayCalc[2]);
      const operator = sumArrayCalc[1];

      if (operator === "x") {
        finalCalc = number1;
        finalCalc = finalCalc * number2;
      }

      if (operator === "+") {
        finalCalc = number1;
        finalCalc = finalCalc + number2;
      }

      if (operator === "-") {
        finalCalc = number1;
        finalCalc = finalCalc - number2;
      }

      if (operator === "/") {
        finalCalc = number1;
        finalCalc = finalCalc / number2;
      }
      sumArray.unshift(finalCalc);
    }

    return finalCalc;
  };

  render() {
    return (
      <div className={styles.calculator}>
        <Display total={this.state.display} />

        <Buttons numberClicked={this.buttonClicked} />
      </div>
    );
  }
}
