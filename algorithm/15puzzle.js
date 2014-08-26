function array(n) {
  return new Array(16).join('.').split('.').map(function(_, i) {
    return i;
  });
}

function toString(pattern) {
  var hash = '';
  for (var i = 0, len = pattern.length; i < len; i++) {
    hash += pattern[i].toString(16);
  }
  return hash;
}

function toPrettyString(hash) {
  var s = [];
  var linefeed = '';
  for (var i = 0; i < 4; i++) {
    s.push(linefeed);
    var sep = '';
    for (var j = 0; j < 4; j++) {
      s.push(sep);
      s.push(hash[i * 4 + j]);
      sep = ' ';
    }
    linefeed = '\n';
  }
  return s.join('');
}

function fromString(hash) {
  return hash.split('').map(function(c) {
    return parseInt(c, 16);
  })
}

function Puzzle(values) {
  this.values = values || array(16);
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
      [
         0,  1,  2,  3,
         4,  5,  6,  7,
         8,  9, 10, 11,
        12, 13, 14, 15
      ]
   */
  switch (direction) {
    case 0: // up
      if (this.spaceIndex < 4) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex - 4);
      this.spaceIndex -= 4;
      return true;
    case 1: // right
      if (this.spaceIndex % 4 === 3) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex + 1);
      this.spaceIndex += 1;
      return true;
    case 2: // down
      if (this.spaceIndex > 11) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex + 4);
      this.spaceIndex += 4;
      return true;
    case 3: // left
      if (this.spaceIndex % 4 === 0) {
        return false;
      }
      this.swap(this.spaceIndex, this.spaceIndex - 1);
      this.spaceIndex -= 1;
      return true;
    default:
      return;
  }
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
  return toPrettyString(this.toHash());
};

Puzzle.fromString = function(hash) {
  var values = fromString(hash);
  return new Puzzle(values);
};

function History() {
  this.history = [];
  this.keys = {};
}

History.prototype.push = function(puzzle, from) {
  var hash = puzzle.toHash();
  if (this.keys[hash]) {
    return false;
  }
  this.history.push(hash);
  this.keys[hash] = from;
  return true;
};

History.prototype.size = function() {
  return this.history.length;
};

History.prototype.get = function(index) {
  return this.history[index];
};

History.prototype.of = function(index) {
  this.currentIndex = index;
  return this;
};

History.prototype.toString = function(index) {
  var hash = this.history[index];
  var process = [
    '=======',
    toPrettyString(hash),
  ];
  while (this.keys[hash] !== 'start') {
    process.push('-------');
    process.push(toPrettyString(this.keys[hash]));
    hash = this.keys[hash];
  };
  process.push('=======');
  return process.reverse().join('\n');
};

function solve(puzzle) {
  var history = new History();
  history.push(puzzle, 'start');
  var tryIndex = 0;
  while (tryIndex < history.size()) {
    var hash = history.get(tryIndex);
    puzzle = Puzzle.fromString(hash);
    if (puzzle.toHash() === '0123456789abcdef') {
      return {
        puzzle: puzzle,
        history: history,
        index: tryIndex
      };
    }
    for (var i = 0; i < 4; i++) {
      if (!puzzle.moveSpace(i)) {
        continue;
      }
      history.push(puzzle, hash);
      // revert
      puzzle.moveSpace((i + 2) % 4);
    }
    tryIndex++;
  }
  return null;
}

function main() {
  var puzzle = new Puzzle();
  puzzle.moveRamdomly(20);
  console.log(puzzle.toString());

  var solved = solve(puzzle);

  if (solved) {
    console.log(solved.history.toString(solved.index));
    console.log(solved.puzzle.toString());
  } else {
    console.log('unsolved');
  }
}

main();
