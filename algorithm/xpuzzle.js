function array(n) {
  return Array.apply(null, {length: n}).map(Number.call, Number);
}

function toString(pattern) {
  var hash = '';
  for (var i = 0, len = pattern.length; i < len; i++) {
    hash += pattern[i].toString(36);
  }
  return hash;
}

function toPrettyString(hash, numRows, numCols) {
  var s = [];
  var linefeed = '';
  for (var i = 0; i < numRows; i++) {
    s.push(linefeed);
    var sep = '';
    for (var j = 0; j < numCols; j++) {
      s.push(sep);
      s.push(hash[i * numCols + j]);
      sep = ' ';
    }
    linefeed = '\n';
  }
  return s.join('');
}

function fromString(hash) {
  return hash.split('').map(function(c) {
    return parseInt(c, 36);
  })
}

function repeat(c, num) {
  var str = '';
  for (var i = 0; i < num; i++) {
    str += c;
  }
  return str;
}

function Puzzle(numRows, numCols, values) {
  this.numRows = numRows;
  this.numCols = numCols;
  this.values = values || array(numRows * numCols);
  for (var i = 0, len = this.values.length; i < len; i++) {
    if (this.values[i] === 0) {
      this.spaceIndex = i;
      break;
    }
  }
}

Puzzle.prototype.moveRamdomly = function(times) {
  while (times > 0) {
    if (this.moveSpace(Math.random() * 4 | 0)) {
      times--;
    }
  }
}

Puzzle.prototype.moveSpace = function(direction) {
  /*
      When numRows = 2, numCols = 4

      [
         0,  1,  2,  3,
         4,  5,  6,  7
      ]
   */
  switch (direction) {
    case 0: // up
      if (this.spaceIndex < this.numCols) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex - this.numCols);
      this.spaceIndex -= this.numCols;
      return true;
    case 1: // right
      if (this.spaceIndex % this.numCols === this.numCols - 1) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex + 1);
      this.spaceIndex += 1;
      return true;
    case 2: // down
      if (this.spaceIndex > this.numCols * (this.numRows - 1) - 1) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex + this.numCols);
      this.spaceIndex += this.numCols;
      return true;
    case 3: // left
      if (this.spaceIndex % this.numCols === 0) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex - 1);
      this.spaceIndex -= 1;
      return true;
    default:
      return false;
  }
};

Puzzle.prototype.moveBackSpace = function(direction) {
  return this.moveSpace((direction + 2) % 4);
};

Puzzle.prototype.swap = function(a, b) {
  var v = this.values[a];
  this.values[a] = this.values[b];
  this.values[b] = v;
};

Puzzle.prototype.toHash = function() {
  return toString(this.values);
};

Puzzle.prototype.toString = function() {
  return toPrettyString(this.toHash(), this.numRows, this.numCols);
};

Puzzle.fromString = function(hash, numRows, numCols) {
  var values = fromString(hash);
  return new Puzzle(numRows, numCols, values);
};

function History(puzzle) {
  this.numRows = puzzle.numRows;
  this.numCols = puzzle.numCols;
  this.history = [];
  this.keys = {};
  this.push(puzzle);
}

History.prototype.push = function(puzzle, from) {
  var hash = puzzle.toHash();
  if (this.keys[hash]) {
    return false;
  }
  this.history.push(hash);
  this.keys[hash] = from || 'start';
  return true;
};

History.prototype.size = function() {
  return this.history.length;
};

History.prototype.get = function(index) {
  return Puzzle.fromString(this.history[index], this.numRows, this.numCols);
};

History.prototype.of = function(index) {
  this.currentIndex = index;
  return this;
};


History.prototype.toString = function(hash) {
  var doubleLine = repeat('=', this.numCols * 2 - 1);
  var singleLine = repeat('-', this.numCols * 2 - 1);

  var process = [
    doubleLine,
    toPrettyString(hash, this.numRows, this.numCols),
  ];
  while (this.keys[hash] !== 'start') {
    process.push(singleLine);
    process.push(toPrettyString(this.keys[hash], this.numRows, this.numCols));
    hash = this.keys[hash];
  };
  process.push(doubleLine);
  return process.reverse().join('\n');
};

var ANSWER = '0123456789abcdefghijklmnopqrstuvwxyz';

function solve(puzzle) {
  var history = new History(puzzle);
  var tryIndex = 0;
  while (tryIndex < history.size()) {
    puzzle = history.get(tryIndex);
    var hash = puzzle.toHash();
    if (ANSWER.indexOf(puzzle.toHash()) > -1) {
      return {
        puzzle: puzzle,
        history: history
      };
    }
    for (var direction = 0; direction < 4; direction++) {
      if (!puzzle.moveSpace(direction)) {
        continue;
      }
      history.push(puzzle, hash);
      // revert
      puzzle.moveBackSpace(direction);
    }
    tryIndex++;
  }
  return null;
}

function main() {
  var puzzle = new Puzzle(6, 6);
  puzzle.moveRamdomly(20);
  console.log(puzzle.toString());

  var solved = solve(puzzle);

  if (solved) {
    console.log(solved.history.toString(solved.puzzle.toHash()));
    console.log(solved.puzzle.toString());
  } else {
    console.log('unsolved');
  }
}

main();
