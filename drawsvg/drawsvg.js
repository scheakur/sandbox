(function () {

  function svg() {
    return document.querySelector('svg');
  }


  function newElem(props) {
    var tag = props.tag;
    var attrs = props.attrs;
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
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
      }
    },
    box: {
      draw: function(start, end) {
        var width = end.x - start.x;
        var height = end.y - start.y;
        if (Math.abs(width) > 10 && Math.abs(height) > 10) {
          drawBox(start.x, start.y, width, height);
        }
      }
    }
  };

  function getCurrentTool() {
    var tool = (document.querySelector('input[name="tool"]:checked') || {}).value;
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
      getCurrentTool().draw(start, end);
    }, false);
  }


  window.addEventListener('DOMContentLoaded', main, false);

}());

