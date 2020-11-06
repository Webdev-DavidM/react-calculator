export default function validationInput(e, currDisp) {
  let userInput = e.target.textContent;
  if (userInput === 'ac') {
    return true;
  }
  currDisp = currDisp.toString();
  // this will stop the user being able to type in more than one decimal

  if (currDisp.includes('.') && userInput === '.') {
    return false;
  }

  // this will check if and stop a user starting a calculation with one of the below operators, - is left out as they can use - numbers in their calculations.

  if (currDisp === '0' && ['+', 'x', '/', '='].includes(userInput)) {
    return false;
  }

  // This stops the user typing to the same operator twice
  if (
    ['+', 'x', '/', '='].includes(currDisp.charAt(currDisp.length - 1)) &&
    ['+', 'x', '/', '='].includes(userInput)
  ) {
    return false;
  } else {
    return true;
  }
}
