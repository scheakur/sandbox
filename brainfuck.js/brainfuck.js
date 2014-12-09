var bf = (function() {

  var pointer;
  var memory;
  var display;


  function brainfuck(code) {
    console.log(code);

    init(100);

    for (var i = 0, len = code.length; i < len; i++) {
      switch (code[i]) {
        case '>': incrementPointer(); break;
        case '<': decrementPointer(); break;
        case '+': increment(); break;
        case '-': decrement(); break;
        case '.': output(); break;
        case ',': input(); break;
        case '[': i = jump(code, i); break;
        case ']': i = jumpBack(code, i); break;
      }
    }

    console.log(display.join(''));
  }


  function init(memorySize) {
    pointer = 0;
    memory = Array.apply(null, {length: memorySize}).map(function() { return 0; });
    display = [];
  }


  function incrementPointer() {
    pointer++;
  }


  function decrementPointer() {
    pointer--;
  }


  function increment() {
    memory[pointer]++;
  }


  function decrement() {
    memory[pointer]--;
  }


  function output() {
    display.push(ch(memory[pointer]));
  }


  function ch() {
    return String.fromCharCode([memory[pointer]]);
  }


  function input() {
    //TODO implement
  }


  function jump(code, i) {
    if (memory[pointer] !== 0) {
      return i;
    }
    var open = 0;
    for (var j = i + 1, len = code.length; j < len; j++) {
      if (code[j] === '[') {
        open++;
      } else if (code[j] === ']') {
        if (open === 0) {
          return j;
        }
        oepn--;
      }
    }
    return i;
  }


  function jumpBack(code, i) {
    if (memory[pointer] === 0) {
      return i;
    }
    var close = 0;
    for (var j = i - 1; j > 0; j--) {
      if (code[j] === ']') {
        close++;
      } else if (code[j] === '[') {
        if (close === 0) {
          return j;
        }
        close--;
      }
    }
    return i;
  }

  return brainfuck;

})();

// Hello, world!
bf('+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.');
