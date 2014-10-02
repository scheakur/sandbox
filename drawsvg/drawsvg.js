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
      'stroke-width': 5
    }));
  }


  function pos(event) {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }


  function main() {
    var start = null;

    document.addEventListener('mousedown', function(event) {
      start = pos(event);
    }, false);

    document.addEventListener('mouseup', function(event) {
      var end = pos(event);
      var width = end.x - start.x;
      var height = end.y - start.y;
      if (Math.abs(width) > 10 && Math.abs(height) > 10) {
        drawBox(start.x, start.y, width, height);
      }
    }, false);
  }


  window.addEventListener('DOMContentLoaded', main, false);

}());

