function main() {
  makeNumbers([], 0);
}


function makeNumbers(numbers, num) {
  if (numbers.length === 4) {
    var rpn = [];
    if (makeRPN(0, 0, rpn, numbers)) {
      console.log('Solved', rpn.join(' '));
    } else {
      // console.log('Not solved');
    }
    return;
  }

  for (var i = num; i < 10; i++) {
    numbers.push(i);
    makeNumbers(numbers, i);
    numbers.pop();
  }
}


var operators = ['+', '-', '*', '/'];
var issued = [false, false, false, false];


function makeRPN(num, exp, rpn, numbers) {
  if (num + exp === 7) {
    if (solve(rpn)) {
      return true;
    }
    return false;
  }

  if (num - exp >= 2) {
    var n = rpn.length;
    for (var i = 0; i < operators.length; i++) {
      rpn.push(operators[i]);
      if (makeRPN(num, exp + 1, rpn, numbers)) {
        return true;
      }
      rpn.pop();
    }
  }

  if (num <= 3) {
    for (var i = 0; i < 4; i++) {
      if (!issued[i]) {
        issued[i] = true;
        rpn.push(numbers[i]);
        if (makeRPN(num + 1, exp, rpn, numbers)) {
          issued[i] = false;
          return true;
        }
        rpn.pop();
        issued[i] = false;
      }
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
    var ch = rpn[c];
    if (/[0-9]/.test(ch)) {
      stack.push(f(1, ch));
    } else {
      var f1 = stack.pop();
      var f2 = stack.pop();

      switch (ch) {
        case '+':
          stack.push(
            f(f1.denominator * f2.denominator,
              f2.numerator * f1.denominator + f1.numerator * f2.denominator));
          break;
        case '-':
          stack.push(
            f(f1.denominator * f2.denominator,
              f2.numerator * f1.denominator - f1.numerator * f2.denominator));
          break;
        case '*':
          stack.push(
            f(f1.denominator * f2.denominator,
              f2.numerator * f1.numerator));
          break;
        case '/':
          if (f2.denominator * f1.numerator === 0) {
            return null;
          }
          stack.push(
            f(f2.denominator * f1.numerator,
              f2.numerator * f1.denominator));
          break;
      }
    }
    c++;
  }

  return stack.pop();
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
