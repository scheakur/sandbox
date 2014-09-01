function main() {
  makeAndCheckNumbers([], 0);
}


function makeAndCheckNumbers(numbers, startingNum) {
  if (numbers.length === 4) {
    var rpn = [];
    var usedIndexes = numbers.map(function() {
      return false;
    });
    if (makeAndCheckRPN(rpn, numbers, 0, 0, usedIndexes)) {
      console.log('Solved', rpn.join(' '));
    } else {
      // console.log('Not solved');
    }
    return;
  }

  for (var i = startingNum; i < 10; i++) {
    numbers.push(i);
    makeAndCheckNumbers(numbers, i);
    numbers.pop();
  }
}


var operators = ['+', '-', '*', '/'];


function makeAndCheckRPN(rpn, numbers, num, exp, usedIndexes) {
  if (num + exp === 7) {
    return solve(rpn);
  }

  if (num - exp >= 2) {
    if (addOperatorAndCheck(rpn, numbers, num, exp, usedIndexes)) {
      return true;
    }
  }

  if (num <= 3) {
    if (addNumberAndCheck(rpn, numbers, num, exp, usedIndexes)) {
      return true;
    }
  }

  return false;
}


function addOperatorAndCheck(rpn, numbers, num, exp, usedIndexes) {
  for (var i = 0; i < operators.length; i++) {
    rpn.push(operators[i]);
    if (makeAndCheckRPN(rpn, numbers, num, exp + 1, usedIndexes)) {
      return true;
    }
    rpn.pop();
  }
  return false;
}


function addNumberAndCheck(rpn, numbers, num, exp, usedIndexes) {
  for (var i = 0; i < numbers.length; i++) {
    if (!usedIndexes[i]) {
      usedIndexes[i] = true;
      rpn.push(numbers[i]);
      if (makeAndCheckRPN(rpn, numbers, num + 1, exp, usedIndexes)) {
        usedIndexes[i] = false;
        return true;
      }
      rpn.pop();
      usedIndexes[i] = false;
    }
  }
  return false;
}


function solve(rpn) {
  return checkResult(calcRPN(rpn));
}


function calcRPN(rpn) {
  var stack = [];
  var c = 0;
  while (c != rpn.length) {
    var ch = rpn[c++];

    if (/[0-9]/.test(ch)) {
      stack.push(f(1, ch));
      continue;
    }

    var n1 = stack.pop();
    var n2 = stack.pop();
    var n = calc(n1, n2, ch);
    if (n === null) {
      return null;
    }
    stack.push(n);
  }

  return stack.pop();
}


function calc(n1, n2, op) {
  switch (op) {
    case '+':
      return f(n1.denominator * n2.denominator,
          n2.numerator * n1.denominator + n1.numerator * n2.denominator);
    case '-':
      return f(n1.denominator * n2.denominator,
          n2.numerator * n1.denominator - n1.numerator * n2.denominator);
    case '*':
      return f(n1.denominator * n2.denominator, n2.numerator * n1.numerator);
    case '/':
      if (n2.denominator * n1.numerator === 0) {
        return null;
      }
      return f(n2.denominator * n1.numerator, n2.numerator * n1.denominator);
  }
  return null;
}


function checkResult(f) {
  if (!f) {
    return false;
  }
  if (f.denominator * 10 === f.numerator) {
    return true;
  }
  return false;
}


function Fraction(denominator, numerator) {
  if (denominator === 0) {
    throw new Error('Divide by 0');
  }
  this.numerator = numerator;
  this.denominator = denominator;
}


function f(d, n) {
  return new Fraction(Number(d), Number(n));
}


main();
