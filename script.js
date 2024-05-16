const buttons = document.querySelectorAll(".btnNumber");

buttons.forEach(button => {
  button.addEventListener("touchend", () => {
    button.classList.remove("active");
  });
});
var userInput = "";

function getNumber(numb) {
  document.getElementById("calculation").innerHTML =
    document.getElementById("calculation").innerHTML + numb;
  userInput += numb;
}
function clearScreen() {
  document.getElementById("calculation").innerHTML = "";
  userInput = "";
}

function calculate() {
  try {
    let finalResult = getResult(userInput);
    if (finalResult == undefined) {
      document.getElementById("calculation").style.fontSize = "2.5vw";
      document.getElementById("calculation").innerHTML = "Invalid calculation";
      userInput = "";
    } else {
      document.getElementById("calculation").innerHTML = finalResult;
    }

    userInput = "" + finalResult;
  } catch (error) {
    document.getElementById("calculation").style.fontSize = "2.5vw";
    document.getElementById("calculation").innerHTML = "Invalid calculation";
    finalResult = "";
  }
}

function getResult(numbers) {
  var nums = [];
  var signs = [];
  var num = "";
  for (let i = 0; i < numbers.length; i++) {
    if ("0123456789.".includes(numbers[i])) {
      num += numbers[i];
    } else {
      nums.push(parseFloat(num));
      num = "";
      while (
        signs.length > 0 &&
        order(numbers[i]) <= order(signs[signs.length - 1])
      ) {
        operation(signs, nums);
      }
      signs.push(numbers[i]);
    }
  }
  if (num != "") {
    nums.push(parseFloat(num));
  }
  while (signs.length > 0) {
    operation(signs, nums);
  }
  return nums[0];
}

function operation(signs, nums) {
  var sign = signs.pop();
  var num1 = nums.pop();
  var num2 = nums.pop();
  if (sign === "+") {
    nums.push(num1 + num2);
  } else if (sign === "-") {
    nums.push(num2 - num1);
  } else if (sign === "/") {
    nums.push(num2 / num1);
  } else if (sign === "*") {
    nums.push(num1 * num2);
  }
}

function order(sign) {
  if (sign === "+" || sign === "-") {
    return 1;
  } else if (sign === "/" || sign === "*") {
    return 2;
  } else {
    return 0;
  }
}
