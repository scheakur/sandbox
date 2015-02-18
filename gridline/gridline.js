(function(window, document) {

  function main() {
    var sizer = document.querySelector('.gridsize');
    var min = sizer.min;
    var max = sizer.max;
    sizer.addEventListener('change', function(e) {
      resetGrid(Number(e.target.value), min, max);
    });
    resetGrid(Number(sizer.value), min, max);
  }

  function resetGrid(size, min, max) {
    if (isNaN(size) || size < min || size > max) {
      return;
    }

    var image = createCrossImage(size, 10);

    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundImage = 'url(' + image + ')';
  }

  function createCrossImage(size, subLines) {
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var half = (size % 2 === 0) ? (size + 1) / 2 : size / 2;
    var ctx = canvas.getContext('2d');

    var subSize = size / subLines;
    for (var i = 1; i <= subLines / 2; i++) {
      [1, -1].forEach(function(sign) {
        var diff = sign * i * subSize;
        ctx.beginPath();
        ctx.moveTo(0, half + diff);
        ctx.lineTo(size, half + diff);
        ctx.moveTo(half + diff, 0);
        ctx.lineTo(half + diff, size);
        ctx.strokeStyle = '#eee';
        ctx.stroke();
      });
    }

    ctx.beginPath();
    ctx.moveTo(0, half);
    ctx.lineTo(size, half);
    ctx.moveTo(half, 0);
    ctx.lineTo(half, size);
    ctx.strokeStyle = '#76d3e6';
    ctx.stroke();

    return canvas.toDataURL();
  }

  window.addEventListener('DOMContentLoaded', main, false);

})(window, document);
