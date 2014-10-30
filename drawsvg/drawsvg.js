(function() {

  function svg() {
    return document.querySelector('svg');
  }


  function merge(a, b) {
    for (var p in b) {
      if (Array.isArray(a[p]) && Array.isArray(b[p])) {
        a[p] = a[p].concat(b[p]);
      } else {
        a[p] = b[p];
      }
    }
    return a;
  }


  function newElem(props) {
    var tag = props.tag;
    var attrs = props.attrs;
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    updateElem(el, attrs);
    return el;
  }


  function updateElem(elem, attrs) {
    for (var key in attrs) {
      if (Array.isArray(attrs[key])) {
        elem.setAttribute(key, attrs[key].join(' '));
      } else {
        elem.setAttribute(key, attrs[key]);
      }
    }
  }


  function draw(props) {
    svg().appendChild(newElem(props));
  }


  function drawShadow(props) {
    var shadow = forceGetShadow(props.tag);
    var attrs = merge(props.attrs, {
      class: ['svg', 'shadow']
    });
    updateElem(shadow, attrs);
  }


  function lineProps(x1, y1, x2, y2) {
    var path = paths.Path()
      .moveto(x1, y1)
      .lineto(x2, y2);

    return {
      tag: 'path',
      attrs: {
        d: path.print(),
        class: ['svg', 'line']
      }
    };
  }


  function drawLine(start, end) {
    var ex = end.x;
    var ey = end.y;
    if (distance(start, end) < gridSize) {
      ex = start.x + gridSize * 10;
      ey = end.y + gridSize * 10;
    }
    draw(lineProps(start.x, start.y, ex, ey));
  }


  function drawLineShadow(start, end) {
    drawShadow(lineProps(start.x, start.y, end.x, end.y));
  }


  function boxProps(x, y, w, h) {
    var path = paths.Path()
      .moveto(x, y)
      .lineto(x + w, y)
      .lineto(x + w, y + h)
      .lineto(x, y + h)
      .closepath();

    return {
      tag: 'path',
      attrs: {
        d: path.print(),
        class: ['svg', 'box']
      }
    };
  }


  function drawBox(start, end) {
    var width = (end.x - start.x) || gridSize;
    var height = (end.y - start.y) || gridSize;
    if (Math.abs(width) <= gridSize && Math.abs(height) <= gridSize) {
      width = height = gridSize * 10;
    }
    draw(boxProps(start.x, start.y, width, height));
  }


  function drawBoxShadow(start, end) {
    var width = end.x - start.x;
    var height = end.y - start.y;
    drawShadow(boxProps(start.x, start.y, width, height));
  }


  function circleProps(x, y, r) {
    return {
      tag: 'circle',
      attrs: {
        cx: x,
        cy: y,
        r: r,
        class: ['svg', 'circle']
      }
    };
  }


  function drawCircle(start, end) {
    var r = distance(start, end);
    r = (r <= gridSize) ? (gridSize * 5) : r;
    draw(circleProps(start.x, start.y, r));
  }


  function drawCircleShadow(start, end) {
    var r = distance(start, end);
    drawShadow(circleProps(start.x, start.y, r));
  }


  var selected = null;

  function select(start, end, event) {
    if (!event || !hasClass(event.target, 'svg')) {
      return;
    }
    if (selected) {
      selected.classList.remove('selected');
    }
    selected = event.target;
    selected.classList.add('selected');
  }


  function handleSelected(keyCode) {
    if (!selected) {
      return;
    }

    switch (keyCode) {
      case 8:
      case 46:
        removeSelected();
        break;
      default:
        break;
    }
  }


  function removeSelected() {
    if (!selected) {
      return;
    }

    selected.parentNode.removeChild(selected);
    selected = null;
  }


  function hasClass(el, className) {
    return el && el.classList && el.classList.contains(className);
  }


  function pos(event, basePos) {
    return {
      x: normalize(event.pageX - basePos.x),
      y: normalize(event.pageY - basePos.y)
    };
  }


  function normalize(x) {
    return Math.floor(x / gridSize) * gridSize;
  }


  function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }


  var gridSize = 10;


  var tools = {
    empty: {},

    select: {
      keyup: handleSelected,
      mouseup: select,
    },

    line: {
      mouseup: drawLine,
      mousemove: drawLineShadow
    },

    box: {
      mouseup: drawBox,
      mousemove: drawBoxShadow
    },

    circle: {
      mouseup: drawCircle,
      mousemove: drawCircleShadow
    }
  };


  function getCurrentTool() {
    var tool = (document.querySelector('input[name="tool"]:checked') || {}).value;
    return tools[tool] || tools.empty;
  }


  function newShadow(tag) {
    var s = newElem({
      tag: tag,
      attrs: {
        class: ['svg', 'shadow']
      }
    });
    svg().appendChild(s);
    return s;
  }


  function forceGetShadow(tag) {
    var s = getShadow();
    if (!s) {
      s = newShadow(tag);
    }
    return s;
  }


  function getShadow() {
    return document.querySelector('.shadow');
  }


  function removeShadow() {
    var shadow = getShadow();
    if (shadow) {
      shadow.parentNode.removeChild(shadow);
    }
  }


  function main() {
    var canvas = document.querySelector('.canvas');
    var canvasBox = canvas.getBoundingClientRect();

    var basePos = {
      x: canvasBox.x,
      y: canvasBox.y
    };

    var start = null;

    canvas.addEventListener('mousedown', function(event) {
      start = pos(event, basePos);
    }, false);

    document.addEventListener('mousemove', throttle(function(event) {
      if (!start) {
        return;
      }
      var end = pos(event, basePos);
      findHandler('mousemove')(start, end);
    }, 10, 100), false);

    canvas.addEventListener('mouseup', function(event) {
      var end = pos(event, basePos);
      findHandler('mouseup')(start, end, event);
    }, false);

    document.addEventListener('mouseup', function(event) {
      start = null;
      removeShadow();
    }, false);

    document.addEventListener('keyup', function(event) {
      var keyCode = event.keyCode;
      findHandler('keyup')(keyCode);
    }, false);
  }


  function doNothing() {
  }


  function findHandler(key) {
    return getCurrentTool()[key] || doNothing;
  }


  var throttle = (function() {
    var args = [];
    var seq = 0;
    return function throttle(fn, times, maxDelay) {
      var n = 0;
      var timeout = null;
      var s = seq++;

      function run() {
        window.requestAnimationFrame(function() {
          n = 0;
          timeout = null;
          fn.apply(null, args[s]);
        });
      }

      return function() {
        args[s] = arguments;
        if (!timeout) {
          timeout = window.setTimeout(run, maxDelay);
        }
        if (n++ > times) {
          run();
        }
      };
    };
  })();


  window.addEventListener('DOMContentLoaded', main, false);

}());

