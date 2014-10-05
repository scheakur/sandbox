(function () {

  function svg() {
    return document.querySelector('svg');
  }


  function newElem(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }


  function drawLine(x1, y1, x2, y2) {
    var path = paths.Path()
      .moveto(x1, y1)
      .lineto(x2, y2);

    svg().appendChild(newElem('path', {
      d: path.print(),
      stroke: 'black',
      'stroke-width': 5,
      'stroke-linecap': 'round'
    }));
  }


  function drawBox(x, y, w, h) {
    var path = paths.Path()
      .moveto(x, y)
      .lineto(x + w, y)
      .lineto(x + w, y + h)
      .lineto(x, y + h)
      .closepath();

    svg().appendChild(newElem('path', {
      d: path.print(),
      fill: 'yellow',
      stroke: 'black',
      'stroke-width': 5,
      'stroke-linejoin': 'round'
    }));
  }

  function pos(event, basePos) {
    return {
      x: event.pageX - basePos.x,
      y: event.pageY - basePos.y
    };
  }

  var tools = {
    line: function(start, end, width, height) {
      drawLine(start.x, start.y, end.x, end.y);
    },
    box: function(start, end, width, height) {
      if (Math.abs(width) > 10 && Math.abs(height) > 10) {
        drawBox(start.x, start.y, width, height);
      }
    }
  };

  function getCurrentTool() {
    var tool = document.querySelector('input[name="tool"]:checked').value;
    return tools[tool] || function () {};
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

    document.addEventListener('mouseup', function(event) {
      var end = pos(event, basePos);
      var width = end.x - start.x;
      var height = end.y - start.y;
      getCurrentTool()(start, end, width, height);
    }, false);
  }


  window.addEventListener('DOMContentLoaded', main, false);

}());

