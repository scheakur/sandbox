/*global Snap*/
/*jshint newcap:false*/

(function() {
  'use strict';
  var paper, last;

  var width = 800;
  var height = 200;
  var center = width / 2;

  var fns = [
    function() {
      paper = Snap(width, height);
    },

    function() {
      draw(boxes, arrows);
    }
  ];

  function b(id, text, y, x) {
    return {
      id: id,
      text: text,
      y: y,
      x: x || 0
    };
  }

  var boxes = [
    [b('box-id-00', 'foo')],
    [b('box-id-01', 'bar0')],
    [b('box-id-02', 'bar1')],
    [b('box-id-03', 'bar2')],
    [b('box-id-04', ['hoge', 'fuga', 'piyopiyo', 'foobar'])],
    [b('box-id-05', 'hoge'), b('box-id-06', ['fuga', 'piyo'])],
    [b('box-id-07', 'piyo')],
    [b('box-id-08', 'foo'), b('box-id-09', 'bar'), b('box-id-10', 'baz')]
  ];

  function mapify(boxes) {
    return boxes.reduce(function(map, row) {
      row.forEach(function(box) {
        map[box.id] = box;
      });
      return map;
    }, {});
  }

  var boxMap = mapify(boxes);

  function a(start, end) {
    return {
      start: start,
      end: end
    };
  }

  var arrows = [
    a('box-id-00', 'box-id-01'),
    a('box-id-01', 'box-id-02'),
    a('box-id-02', 'box-id-03'),
    a('box-id-03', 'box-id-04'),
    a('box-id-04', 'box-id-05'),
    a('box-id-04', 'box-id-06'),
    a('box-id-05', 'box-id-07'),
    a('box-id-06', 'box-id-07'),
    a('box-id-07', 'box-id-08'),
    a('box-id-07', 'box-id-09'),
    a('box-id-07', 'box-id-10')
  ];

  function draw(bs, as) {
    bs.forEach(function (row) {
      addTextBoxes(row);
    });
    as.forEach(function (a) {
      addConnectorArrow(paper.select('#' + a.start), paper.select('#' + a.end));
    });
  }

  function bottom(el) {
    return (el) ? el.getBBox().y2 : 0;
  }

  function addTextBox(id, text, x, y, start) {
    x = x || center;
    y = y || bottom(start || last);
    var margin = 120;
    var t = paper.text(x, y + margin, text);
    t.attr({
      class: 'box-text'
    });
    t.selectAll('tspan:nth-child(n+2)').attr({
      x: x,
      dy: 40
    });
    var b = t.getBBox();
    var padding = 10;
    var r = paper.rect(b.x - padding, b.y - padding, b.w + 2 * padding, b.h + 2 * padding, 5, 5);
    r.attr({
      class: 'box'
    });

    var g = paper.group(r, t).attr({
      id: id
    });

    last = g;

    if (g.getBBox().y2 > paper.node.getAttribute('height')) {
      paper.node.setAttribute('height', g.getBBox().y2 + 100);
    }
  }

  function addTextBoxes(boxes) {
    console.log(boxes);
    var y = bottom(last);
    var ux = width / (boxes.length + 1);
    var x = ux;
    var start = last;
    boxes.forEach(function(box) {
      addTextBox(box.id, box.text, x, y, start);
      x += ux;
    });
  }

  function fmt(tmpl) {
    var parts = Array.prototype.slice.call(arguments, 1, arguments.length);
    var i = 0;
    return tmpl.replace(/%s/g, function() {
      return parts[i++];
    });
  }

  var tipH = 16;
  var tipW = 10;

  function addConnectorArrow(start, end) {
    if (!start || !end) {
      return;
    }

    var bs = start.getBBox();
    var xs = bs.cx;
    var ys = bs.y2;

    var be = end.getBBox();
    var xe = be.cx;
    var ye = be.y;

    if (Math.abs(xe - xs) < 10 || Math.abs(ye - ys) < 10) {
      straight(xs, ys, xe, ye);
    } else {
      curve(xs, ys, xe, ye);
    }
  }

  function straight(xs, ys, xe, ye) {
    var bar = paper.path(fmt('M %s %s L %s %s', xs, ys, xe, ye)).attr({
      class: 'arrow'
    });
    paper.group(bar, tip(xe, ye));
  }

  function curve(xs, ys, xe, ye) {
    var ydiff = ys - ye;
    var invert = ydiff > 0;
    var bar = paper.path(fmt('M %s %s Q %s %s %s %s %s %s %s %s',
        xs, ys,
        xs, invert ? ys + ydiff : ye,
        xs + (xe - xs) / 2, ys + (ye - ys) / 2,
        xe, invert ? ye - ydiff : ys,
        xe, ye)).attr({
      class: 'arrow'
    });
    paper.group(bar, tip(xe, ye));
  }

  function tip(x, y) {
    return paper.path(fmt('M %s %s l %s %s %s -%s',
        x - tipW,  y - tipH, tipW, tipH, tipW, tipH)).attr({
      class: 'arrow'
    });
  }


  var interval = 300;

  function doAll() {
    var p = Promise.resolve();
    fns.forEach(function(fn) {
      p = p.then(function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve();
          }, interval);
        });
      }).then(fn);
    });
  }

  document.addEventListener('DOMContentLoaded', doAll);
})();
