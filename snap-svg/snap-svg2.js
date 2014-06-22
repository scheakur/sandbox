/*global Snap*/
/*jshint newcap:false*/

(function(global) {
  'use strict';
  var paper, last;

  var width = 800;
  var height = 200;
  var center = width / 2;

  global.main = function() {
    paper = Snap(width, height);
    draw(boxes, arrows);
  };

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
      addConnectorArrow(a);
    });
  }

  function bottom(el) {
    return (el) ? el.getBBox().y2 : 0;
  }

  function textAt(x, y, text) {
    var t = paper.text(x, y, text).attr({
      class: 'box-text'
    });
    t.selectAll('tspan:nth-child(n+2)').attr({
      x: x,
      dy: 40
    });
    return t;
  }

  function boxAround(textElem) {
    var b = textElem.getBBox();
    var padding = 10;
    return paper.rect(
      b.x - padding, b.y - padding, b.w + 2 * padding, b.h + 2 * padding, 5, 5
    ).attr({
      class: 'box'
    });
  }

  function addTextBox(id, text, x, y, start) {
    x = x || center;
    y = y || bottom(start || last);
    var margin = 120;
    var t = textAt(x, y + margin, text);
    var b = boxAround(t);

    var g = paper.group(b, t).attr({
      id: id
    });

    last = g;

    resizePaper(g);
    makeDraggable(g);
  }

  function resizePaper(g) {
    if (g.getBBox().y2 > paper.node.getAttribute('height')) {
      height = g.getBBox().y2 + 100;
      paper.node.setAttribute('height', height);
    }
  }

  function minmax(v, min, max) {
    return Math.max(Math.min(v, max), min);
  }

  function makeDraggable(g) {
    var origTransform;
    var base;
    g.drag(function(dx, dy) {
      var xmin = 5;
      var xmax = width - 5;
      var ymin = 5;
      var ymax = height - 5;
      dx = minmax(dx, xmin - base.x, xmax - base.x2);
      dy = minmax(dy, ymin - base.y, ymax - base.y2);
      this.attr({
        transform: origTransform + (origTransform ? 'T' : 't') + [dx, dy]
      });
      var id = this.node.id;
      paper.selectAll('.' + id).forEach(function(elem) {
        redraw(elem);
      });
    }, function() {
      base = g.getBBox();
      origTransform = this.transform().local;
    });
  }

  function getArrowInfo(elem) {
    var cls = elem.node.classList;
    return a.apply(null, cls);
  }

  function redraw(elem) {
    var a = newArrow(getArrowInfo(elem));
    elem.select('.shaft').attr({
      d: a.shaftPath()
    });
    elem.select('.tip').attr({
      d: a.tipPath()
    });
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

  function newArrow(arrowInfo) {
    var start = paper.select('#' + arrowInfo.start);
    var startEdge = arrowInfo.startEdge;
    var end = paper.select('#' + arrowInfo.end);
    var endEdge = arrowInfo.endEdge;

    if (!start || !end) {
      return arrow();
    }

    var s = getConnectPoint(start, startEdge);
    var e = getConnectPoint(end, endEdge);
    return arrow(s, e);
  }

  function addConnectorArrow(arrowInfo) {
    newArrow(arrowInfo).draw();
  }

  var threshold = Math.tan(15 / 180 * Math.PI);

  function isNearVertical(s, e) {
    return Math.abs((e.x - s.x) / (e.y - s.y)) < threshold;
  }

  function Arrow(s, e) {
    this.s = s;
    this.e = e;
  }

  Arrow.prototype.with = function(pathFn) {
    this.pathFn = pathFn;
    return this;
  };

  Arrow.prototype.draw = function() {
    arrow_(this.s, this.e, this.pathFn);
  };

  Arrow.prototype.shaftPath = function() {
    return this.pathFn(this.s, this.e);
  };

  Arrow.prototype.tipPath = function() {
    return tipPath(this.s, this.e);
  };

  function arrow(s, e) {
    var a = new Arrow(s, e);
    switch (s.edge + '-' + e.edge) {
    case 'bottom-top':
      return a.with(function(s, e) {
        if (e.y - s.y > 0 && isNearVertical(s, e)) {
          return straight(s, e);
        }
        return curve(s, e);
      });
    case 'left-top':
    case 'right-top':
      return a.with(function(s, e) {
        return fmt('M %s %s S %s %s %s %s',
          s.x, s.y,
          e.x, s.y,
          e.x, e.y);
      });
    }
    return a.with(function() { return ''; });
  }

  function p(x, y, edge, id) {
    return {
      x: x,
      y: y,
      edge: edge,
      id: id
    };
  }

  function getConnectPoint(elem, edge) {
    var b = elem.getBBox();
    var id = elem.node.id;
    switch (edge) {
    case 'top':
      return p(b.cx, b.y, edge, id);
    case 'right':
      return p(b.x2, b.cy, edge, id);
    case 'bottom':
      return p(b.cx, b.y2, edge, id);
    case 'left':
      return p(b.x, b.cy, edge, id);
    }
    return p(0, 0, 'bottom', '');
  }

  function arrow_(s, e, pathFn) {
    build(shaft(pathFn(s, e)), tip(s, e), [s, e]);
  }

  function straight(s, e) {
    return fmt('M %s %s L %s %s', s.x, s.y, e.x, e.y);
  }

  function curve(s, e) {
    var xs = s.x, ys = s.y, xe = e.x, ye = e.y;
    var ydiff = roundDiff(ys - ye);
    var invert = ydiff > 0;
    return fmt('M %s %s Q %s %s %s %s %s %s %s %s',
      xs, ys,
      xs, ys + ydiff,
      xs + (xe - xs) / 2, ys + (ye - ys) / 2,
      xe, ye - ydiff,
      xe, ye);
  }

  function roundDiff(v) {
    return minmax(Math.abs(v + 100) / 2, 50, 100);
  }

  function build(shaft, tip, info) {
    paper.group(shaft, tip).attr({
      class: info.map(function(i) {
        return i.id + ' ' + i.edge;
      }).join(' ')
    });
  }

  function shaft(path) {
    return paper.path(path).attr({
      class: 'arrow shaft'
    });
  }

  function tipPath(s, e) {
    return fmt('M %s %s l %s %s %s -%s',
        e.x - tipW,  e.y - tipH, tipW, tipH, tipW, tipH);
  }

  function tip(s, e) {
    return paper.path(tipPath(s, e)).attr({
      class: 'arrow tip'
    });
  }

})(this);
