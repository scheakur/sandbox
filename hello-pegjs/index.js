#! iojs --harmony

var PEG = require('pegjs');

var parser = PEG.buildParser(`
start
  = additive

_
  = " "*

additive
  = left:multiplicative _ "+" _ right:additive { return left + right; }
  / multiplicative

multiplicative
  = left:primary _ "*" _ right:multiplicative { return left * right; }
  / primary

primary
  = integer
  / "(" _ additive:additive _ ")" { return additive; }

integer "integer"
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
`);

console.log(parser.parse('1 + 2 * (3 + 4) + ( 5 * 6 + 7 )'));
