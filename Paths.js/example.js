(function () {

  var w = 400;
  var h = 300;


  function newSvg() {
    var svg = newElem('svg', {
      width: w,
      height: h
    });

    document.body.appendChild(svg);

    return svg;
  }


  function newElem(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    return el;
  }


  function newParallelogram() {
    var path = paths.Path()
      .moveto(10, 10)
      .lineto(110, 10)
      .lineto(140, 60)
      .lineto(40, 60)
      .closepath();

    newSvg().appendChild(newElem('path', {
      d: path.print(),
      fill: 'yellow',
      stroke: 'black',
      'stroke-width': 5
    }));
  }


  function main() {
    newParallelogram();
  }


  window.addEventListener('DOMContentLoaded', main);

}());
