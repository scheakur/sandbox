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
      addTextBox('foo');
    },

    function() {
      for (var i = 0; i < 3; i++) {
        addTextBox('bar' + i);
      }
    },

    function() {
      addTextBox(['hoge', 'fuga']);
    },

    function() {
      addTextBoxes(['hoge', 'fuga']);
    },

    function() {
      addTextBoxes(['foo', 'bar', 'baz']);
    }

  ];

  function bottom(el) {
    return (el) ? el.getBBox().y2 : 0;
  }

  function addTextBox(text, x, y, from) {
    x = x || center;
    y = y || bottom(from || last);
    var margin = 120;
    var t = paper.text(x, y + margin, text);
    t.attr({
      class: 'box-text'
    });
    var b = t.getBBox();
    var padding = 10;
    var r = paper.rect(b.x - padding, b.y - padding, b.w + 2 * padding, b.h + 2 * padding, 5, 5);
    r.attr({
      class: 'box'
    });

    var g = paper.group(r, t);

    addConnectorArrow(from || last, g);

    last = g;

    if (g.getBBox().y2 > paper.node.getAttribute('height')) {
      paper.node.setAttribute('height', g.getBBox().y2 + 100);
    }
  }

  function addTextBoxes(texts) {
    var y = bottom(last);
    var ux = width / (texts.length + 1);
    var x = ux;
    var from = last;
    texts.forEach(function(text) {
      addTextBox(text, x, y, from);
      x += ux;
    });
  }

  function fmt(tmpl) {
    var parts = Array.prototype.slice.call(arguments, 1, arguments.length);
    while (tmpl.match(/%s/) && parts.length > 0) {
      tmpl = tmpl.replace(/%s/, parts.shift());
    }
    return tmpl;
  }

  var tipH = 16;
  var tipW = 10;

  function addConnectorArrow(from, to) {
    if (!from || !to) {
      return;
    }

    var bf = from.getBBox();
    var xf = bf.cx;
    var yf = bf.y2;

    var bt = to.getBBox();
    var xt = bt.cx;
    var yt = bt.y;

    if (Math.abs(xt - xf) < 10 || Math.abs(yt - yf) < 10) {
      straight(xf, yf, xt, yt);
    } else {
      curve(xf, yf, xt, yt);
    }
  }

  function straight(xf, yf, xt, yt) {
    var bar = paper.path(fmt('M %s %s L %s %s', xf, yf, xt, yt)).attr({
      class: 'arrow'
    });
    var tip = paper.path(fmt('M %s %s l %s %s %s -%s',
        xt - tipW,  yt - tipH, tipW, tipH, tipW, tipH)).attr({
      class: 'arrow'
    });
    paper.group(bar, tip);
  }

  function curve(xf, yf, xt, yt) {
    var ydiff = yf - yt;
    var invert = ydiff > 0;
    var bar = paper.path(fmt('M %s %s Q %s %s %s %s %s %s %s %s',
        xf, yf,
        xf, invert ? yf + ydiff : yt,
        xf + (xt - xf) / 2, yf + (yt - yf) / 2,
        xt, invert ? yt - ydiff : yf,
        xt, yt)).attr({
      class: 'arrow'
    });
    var tip = paper.path(fmt('M %s %s l %s %s %s -%s',
        xt - tipW,  yt - tipH, tipW, tipH, tipW, tipH)).attr({
      class: 'arrow'
    });
    paper.group(bar, tip);
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
