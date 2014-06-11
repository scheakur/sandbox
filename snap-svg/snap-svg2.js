/*global Snap*/
/*jshint newcap:false*/

(function() {
  'use strict';
  var paper, last;

  var fns = [
    function() {
      paper = Snap(800, 600);
    },

    function() {
      addTextBox('foo');
      addArrow();
    },

    function() {
      for (var i = 0; i < 3; i++) {
        addTextBox('bar' + i);
        addArrow();
      }
    },

    function() {
      addTextBox(['hoge', 'fuga']);
    },

    function() {
      addTextBoxes(['hoge', 'fuga']);
    }

  ];

  function bottom(el) {
    return (el) ? el.getBBox().y2 : 0;
  }

  function addTextBox(text, x, y) {
    x = x || 60;
    y = y || bottom(last);
    var margin = 80;
    var t = paper.text(x, y + margin, text);
    t.attr({
      class: 'box-text'
    });
    var b = t.getBBox();
    var padding = 10;
    var r = paper.rect(b.x - padding, b.y - padding, b.w + 2 * padding, b.h + 2 * padding, 5, 5);
    last = r;
    r.attr({
      class: 'box'
    });
    paper.group(r, t);
  }

  function addTextBoxes(texts) {
    var y = bottom(last);
    var x = 60;
    texts.forEach(function(text) {
      console.log(text, x, y);
      addTextBox(text, x, y);
      x += 200;
    });
  }

  function addArrow() {
    var y = bottom(last);
    var bar = paper.path('M 60 ' + y + ' l 0 45').attr({
      class: 'arrow'
    });
    var tip = paper.path('M 50 ' + (y + 30) + ' l 10 15 10 -15').attr({
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


