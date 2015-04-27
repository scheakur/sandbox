(function(window, document) {

  function main() {
    var sizer = document.querySelector('.gridsize');
    var min = sizer.min;
    var max = sizer.max;
    sizer.addEventListener('change', function(e) {
      resetGrid(Number(e.target.value), min, max);
    });
    resetGrid(Number(sizer.value), min, max, document.body);
  }

  function resetGrid(size, min, max, container) {
    if (isNaN(size) || size < min || size > max) {
      return;
    }

    var image = createCrossImage(size, 10);

    container.style.backgroundRepeat = 'repeat';
    container.style.backgroundImage = 'url(' + image + ')';
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
        drawLine(ctx, half + diff, half + diff, size, '#eee');
      });
    }

    drawLine(ctx, half, half, size, '#76d3e6');

    return canvas.toDataURL();
  }


  function drawLine(context, cx, cy, size, color) {
    context.beginPath();
    context.moveTo(0, cy);
    context.lineTo(size, cy);
    context.moveTo(cx, 0);
    context.lineTo(cx, size);
    context.strokeStyle = color;
    context.stroke();
  }

  window.addEventListener('DOMContentLoaded', main, false);

})(window, document);
