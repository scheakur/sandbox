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
    svg().appendChild(newElem(lineProps(x1, y1, x2, y2)));
  }


  function drawLineShadow(x1, y1, x2, y2) {
    var shadow = forceGetShadow('path');
    var attrs = merge(lineProps(x1, y1, x2, y2).attrs, {
      stroke: '#999'
    });
    updateElem(shadow, attrs);
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
        fill: 'yellow',
        stroke: 'black',
        'stroke-width': 5,
        'stroke-linejoin': 'round'
      }
    };
  }


  function drawBox(x, y, w, h) {
    svg().appendChild(newElem(boxProps(x, y, w, h)));
  }


  function drawBoxShadow(x, y, w, h) {
    var shadow = forceGetShadow('path');
    var attrs = merge(boxProps(x, y, w, h).attrs, {
      fill: 'none',
      stroke: '#999'
    });
    updateElem(shadow, attrs);
  }


  function pos(event, basePos) {
    return {
      x: event.pageX - basePos.x,
      y: event.pageY - basePos.y
    };
  }


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
        if (Math.abs(width) > 10 && Math.abs(height) > 10) {
          drawBox(start.x, start.y, width, height);
        }
      },

      drawShadow: function(start, end) {
        var width = end.x - start.x;
        var height = end.y - start.y;
        if (Math.abs(width) > 10 && Math.abs(height) > 10) {
          drawBoxShadow(start.x, start.y, width, height);
        }
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
    }, 10, 200), false);

    document.addEventListener('mouseup', function(event) {
      var end = pos(event, basePos);
      getCurrentTool().draw(start, end);
      start = null;
      removeShadow();
    }, false);
  }


  var args = [];
  var seq = 0;
  function throttle(fn, times, maxDelay) {
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
  }


  window.addEventListener('DOMContentLoaded', main, false);

}());

