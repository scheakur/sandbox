var throttle = (function() {
  var args = [];
  var seq = 0;
  return function throttle(fn, times, maxDelay) {
    var n = 0;
    var timeout = null;
    var s = seq++;

    function run() {
      window.requestAnimationFrame(function() {
        n = 0;
        window.clearTimeout(timeout);
        timeout = null;
        fn.apply(null, args[s]);
      });
    }

    return function() {
      args[s] = arguments;
      if (!timeout) {
        timeout = window.setTimeout(run, maxDelay);
      }
      if (n++ > times) {
        run();
      }
    };
  };
})();


window.addEventListener('keypress', throttle(function(e) {
  console.log('throttled', e);
}, 50, 1000));
