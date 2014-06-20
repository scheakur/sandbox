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

    resizePaper(g);
    makeDraggable(g);
  }

  function resizePaper(g) {
    if (g.getBBox().y2 > paper.node.getAttribute('height')) {
      paper.node.setAttribute('height', g.getBBox().y2 + 100);
    }
  }

  function makeDraggable(g) {
    var origTransform;
    g.drag(function(dx, dy) {
      this.attr({
        transform: origTransform + (origTransform ? 'T' : 't') + [dx, dy]
      });
      var id = this.node.id;
      paper.selectAll('.' + id).forEach(function(elem) {
        redraw(elem);
      });
    }, function() {
      origTransform = this.transform().local;
    });
  }

  function redraw(elem) {
    var cls = elem.node.classList;
    var sid = cls[0];
    var sedge = cls[1];
    var eid = cls[2];
    var eedge = cls[3];
    var start = paper.select('#' + sid);
    var end = paper.select('#' + eid);

    var s = getConnectPoint(start, sedge);
    var e = getConnectPoint(end, eedge);

    var a = arrow(s, e);
    elem.select('.shaft').attr({
      d: a.shaftPath(s, e)
    });
    elem.select('.tip').attr({
      d: a.tipPath(s, e)
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

  function addConnectorArrow(start, startEdge, end, endEdge) {
    if (!start || !end) {
      return;
    }

    var s = getConnectPoint(start, startEdge);
    var e = getConnectPoint(end, endEdge);

    arrow(s, e).draw(s, e);
  }

  function drawer(pathFn) {
    return {
      draw: function(s, e) {
        arrow_(s, e, pathFn);
      },
      shaftPath: pathFn,
      tipPath: tipPath
    };
  }

  function arrow(s, e) {
    switch (s.e + '-' + e.e) {
    case 'bottom-top':
      return drawer(function(s, e) {
        var threshold = 20;
        if (Math.abs(e.x - s.x) < threshold || Math.abs(e.y - s.y) < threshold) {
          return straight(s, e);
        }
        return curve(s, e);
      });
    case 'left-top':
    case 'right-top':
      return drawer(function(s, e) {
        return fmt('M %s %s S %s %s %s %s',
          s.x, s.y,
          e.x, s.y,
          e.x, e.y);
      });
    }
    return drawer(function() {});
  }

  function p(x, y, e, id) {
    return {
      x: x,
      y: y,
      e: e,
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
    var ydiff = ys - ye;
    var invert = ydiff > 0;
    return fmt('M %s %s Q %s %s %s %s %s %s %s %s',
      xs, ys,
      xs, invert ? ys + ydiff : ye,
      xs + (xe - xs) / 2, ys + (ye - ys) / 2,
      xe, invert ? ye - ydiff : ys,
      xe, ye);
  }

  function build(shaft, tip, info) {
    paper.group(shaft, tip).attr({
      class: info.map(function(i) {
        return i.id + ' ' + i.e;
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
        e.x - tipW,  e.y - tipH, tipW, tipH, tipW, tipH)
  }

  function tip(s, e) {
    return paper.path(tipPath(s, e)).attr({
      class: 'arrow tip'
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
