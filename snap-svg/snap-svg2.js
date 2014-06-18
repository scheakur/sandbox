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
    [
      b('box-id-05', 'hoge'),
      b('box-id-06', ['fuga', 'piyo'])
    ],
    [b('box-id-07', 'piyo')],
    [
      b('box-id-08', 'foo'),
      b('box-id-09', 'bar'),
      b('box-id-10', 'baz')
    ]
  ];

  function a(start, startEdge, end, endEdge) {
    return {
      start: start,
      startEdge: startEdge,
      end: end,
      endEdge: endEdge
    };
  }

  var arrows = [
    a('box-id-00', 'bottom', 'box-id-01', 'top'),
    a('box-id-01', 'bottom', 'box-id-02', 'top'),
    a('box-id-02', 'bottom', 'box-id-03', 'top'),
    a('box-id-03', 'bottom', 'box-id-04', 'top'),
    a('box-id-04', 'left',   'box-id-05', 'top'),
    a('box-id-04', 'right',  'box-id-06', 'top'),
    a('box-id-05', 'bottom', 'box-id-07', 'top'),
    a('box-id-06', 'bottom', 'box-id-07', 'top'),
    a('box-id-07', 'bottom', 'box-id-08', 'top'),
    a('box-id-07', 'bottom', 'box-id-09', 'top'),
    a('box-id-07', 'bottom', 'box-id-10', 'top')
  ];

  function draw(bs, as) {
    bs.forEach(function (row) {
      addTextBoxes(row);
    });
    as.forEach(function (a) {
      addConnectorArrow(
        paper.select('#' + a.start), a.startEdge,
        paper.select('#' + a.end), a.endEdge);
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

  function addConnectorArrow(start, startEdge, end, endEdge) {
    if (!start || !end) {
      return;
    }

    var s = getConnectPoint(start, startEdge);
    var e = getConnectPoint(end, endEdge);

    arrow(s, e).draw();
  }

  function drawer(fn) {
    return {
      draw: fn
    };
  }

  function arrow(s, e) {
    switch (s.e + '-' + e.e) {
    case 'bottom-top':
      return drawer(function() {
        if (Math.abs(e.x - s.x) < 10 || Math.abs(e.y - s.y) < 10) {
          straight(s, e);
        } else {
          curve(s, e);
        }
      });
    case 'left-top':
    case 'right-top':
      return drawer(function() {
        paper.group(
          shaft('M %s %s S %s %s %s %s',
            s.x, s.y,
            e.x, s.y,
            e.x, e.y),
          tip(e.x, e.y));
      });
    }
    return drawer(function() {});
  }

  function p(x, y, e) {
    return {
      x: x,
      y: y,
      e: e
    };
  }

  function getConnectPoint(elem, edge) {
    var b = elem.getBBox();
    switch (edge) {
    case 'top':
      return p(b.cx, b.y, edge);
    case 'right':
      return p(b.x2, b.cy, edge);
    case 'bottom':
      return p(b.cx, b.y2, edge);
    case 'left':
      return p(b.x, b.cy, edge);
    }
    return p(0, 0, 'bottom');
  }

  function straight(s, e) {
    var xs = s.x, ys = s.y, xe = e.x, ye = e.y;
    paper.group(shaft('M %s %s L %s %s', xs, ys, xe, ye), tip(xe, ye));
  }

  function curve(s, e) {
    var xs = s.x, ys = s.y, xe = e.x, ye = e.y;
    var ydiff = ys - ye;
    var invert = ydiff > 0;
    paper.group(
      shaft('M %s %s Q %s %s %s %s %s %s %s %s',
        xs, ys,
        xs, invert ? ys + ydiff : ye,
        xs + (xe - xs) / 2, ys + (ye - ys) / 2,
        xe, invert ? ye - ydiff : ys,
        xe, ye),
      tip(xe, ye));
  }

  function shaft() {
    return paper.path(fmt.apply(null, arguments)).attr({
      class: 'arrow'
    });
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
