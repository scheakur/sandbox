/*global Snap*/
/*jshint newcap:false*/

// Code from http://snapsvg.io/start/

(function() {
  'use strict';
  var s, bigCircle, smallCircle, discs, p, t;

  var fns = [
    function() {
      s = Snap(800, 600);
    },

    function() {
      bigCircle = s.circle(150, 150, 100);
    },

    function() {
      bigCircle.attr({
        fill: '#bada55',
        stroke: 'black',
        strokeWidth: 5
      });
    },

    function() {
      smallCircle = s.circle(100, 150, 70);
    },

    function() {
      discs = s.group(smallCircle, s.circle(200, 150, 70));
    },

    function() {
      discs.attr({
        fill: 'white'
      });
    },

    function() {
      bigCircle.attr({
        mask: discs
      });
    },

    function() {
      return new Promise(function(resolve) {
        smallCircle.animate({
          r: 50
        }, 1000, null, function() {
          resolve();
        });
      });
    },

    function() {
      return new Promise(function(resolve) {
        discs.select('circle:nth-child(2)').animate({
          r: 50
        }, 1000, null, function() {
          resolve();
        });
      });
    },

    function() {
      p = s.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
        fill: 'none',
        stroke: '#bada55',
        strokeWidth: 5
      });

      p = p.pattern(0, 0, 10, 10);

      bigCircle.attr({
        fill: p
      });
    },

    function() {
      discs.attr({
        fill: Snap('#pattern')
      });
    },

    function() {
      discs.attr({
        fill: 'r()#fff-#000'
      });
    },

    function() {
      discs.attr({
        fill: 'R(150, 150, 100)#fff-#000'
      });
    },

    function() {
      return new Promise(function(resolve) {
        p.select('path').animate({
          stroke: '#f00'
        }, 1000, null, function() {
          resolve();
        });
      });
    },

    function() {
      s.text(200, 100, 'Snap.svg');
    },

    function() {
      t = s.text(200, 120, ['Snap', '.', 'svg']);
      t.selectAll('tspan:nth-child(3)').attr({
        fill: '#900',
        'font-size': '20px'
      });
    },

    function() {
      t.drag();
    },

    function() {
      var r = s.rect(20, 20, 100, 150, 10, 10);
      r.attr({
        fill: 'none',
        stroke: '#666',
        'stroke-dasharray': '10,5',
        'stroke-width': 4
      });
      r.drag();
    }
  ];

  function doAll() {
    var p = Promise.resolve();
    fns.forEach(function(fn) {
      p = p.then(function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve();
          }, 300);
        });
      }).then(fn);
    });
  }

  document.addEventListener('DOMContentLoaded', doAll);
})();

