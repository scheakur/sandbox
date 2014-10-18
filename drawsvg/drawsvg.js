(function () {

  function svg() {
    return document.querySelector('svg');
  }


  function merge(a, b) {
    for (var p in b) {
      a[p] = b[p];
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
      elem.setAttribute(key, attrs[key]);
    }
  }


  function draw(props) {
    svg().appendChild(newElem(props));
  }


  function drawShadow(props) {
    var shadow = forceGetShadow(props.tag);
    var attrs = merge(props.attrs, {
      fill: 'none',
      stroke: '#999'
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
        stroke: 'black',
        'stroke-width': 5,
        'stroke-linecap': 'round'
      }
    };
  }


  function drawLine(x1, y1, x2, y2) {
    draw(lineProps(x1, y1, x2, y2));
  }


  function drawLineShadow(x1, y1, x2, y2) {
    drawShadow(lineProps(x1, y1, x2, y2));
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
        fill: 'white',
        stroke: 'black',
        'stroke-width': 5,
        'stroke-linejoin': 'round'
      }
    };
  }


  function drawBox(x, y, w, h) {
    draw(boxProps(x, y, w, h));
  }


  function drawBoxShadow(x, y, w, h) {
    drawShadow(boxProps(x, y, w, h));
  }


  function circleProps(x, y, r) {
    return {
      tag: 'circle',
      attrs: {
        cx: x,
        cy: y,
        r: r,
        fill: 'white',
        stroke: 'black',
        'stroke-width': 5,
        'stroke-linejoin': 'round'
      }
    };
  }


  function drawCircle(x, y, r) {
    draw(circleProps(x, y, r));
  }


  function drawCircleShadow(x, y, r) {
    drawShadow(circleProps(x, y, r));
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
    line: {

      draw: function(start, end) {
        drawLine(start.x, start.y, end.x, end.y);
      },

      drawShadow: function(start, end) {
        drawLineShadow(start.x, start.y, end.x, end.y);
      }

    },

    box: {

      draw: function(start, end) {
        var width = end.x - start.x;
        var height = end.y - start.y;
        if (Math.abs(width) > gridSize || Math.abs(height) > gridSize) {
          drawBox(start.x, start.y, width, height);
        } else {
          drawBox(start.x, start.y, gridSize * 10, gridSize * 10);
        }
      },

      drawShadow: function(start, end) {
        var width = end.x - start.x;
        var height = end.y - start.y;
        drawBoxShadow(start.x, start.y, width, height);
      }

    },

    circle: {

      draw: function(start, end) {
        var r = distance(start, end);
        r = (r <= gridSize) ? (gridSize * 5) : r;
        drawCircle(start.x, start.y, r);
      },

      drawShadow: function(start, end) {
        var r = distance(start, end);
        drawCircleShadow(start.x, start.y, r);
      }

    }
  };


  function getCurrentTool() {
    var tool = (document.querySelector('input[name="tool"]:checked') || {}).value;
    return tools[tool] || function () {};
  }


  function newShadow(tag) {
    var s = newElem({
      tag: tag,
      attrs: {
        class: 'shadow'
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
    var canvas = document.querySelector('.canvas').getBoundingClientRect();

    var basePos = {
      x: canvas.x,
      y: canvas.y
    };

    var start = null;

    document.addEventListener('mousedown', function(event) {
      start = pos(event, basePos);
    }, false);

    document.addEventListener('mousemove', throttle(function(event) {
      if (!start) {
        return;
      }
      var end = pos(event, basePos);
      getCurrentTool().drawShadow(start, end);
    }, 10, 100), false);

    document.addEventListener('mouseup', function(event) {
      var end = pos(event, basePos);
      getCurrentTool().draw(start, end);
      start = null;
      removeShadow();
    }, false);
  }


  var throttle = (function() {
    var args = [];
    var seq = 0;
    return function throttle(fn, times, maxDelay) {
      var n = 0;
      var timeout = null;
      var s = seq++;
      return function() {
        args[s] = arguments;
        if (!timeout) {
          timeout = setTimeout(function() {
            n = 0;
            timeout = null;
            fn.apply(null, args[s]);
          }, maxDelay);
        }
        if (n++ > times) {
          n = 0;
          timeout = null;
          fn.apply(null, args[s]);
        }
      };
    };
  })();


  window.addEventListener('DOMContentLoaded', main, false);

}());

