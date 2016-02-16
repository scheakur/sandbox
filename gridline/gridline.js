(function(window, document) {
  function drawLine(context, cx, cy, size, color) {
    context.beginPath();
    context.moveTo(0, cy);
    context.lineTo(size, cy);
    context.moveTo(cx, 0);
    context.lineTo(cx, size);
    context.strokeStyle = color;
    context.stroke();
  }


  function createCrossImage(size, subLines) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const half = (size % 2 === 0) ? (size + 1) / 2 : size / 2;
    const ctx = canvas.getContext('2d');
    const subSize = size / subLines;

    function drawLineAt(diff) {
      drawLine(ctx, half + diff, half + diff, size, '#eee');
    }

    for (let num = 1; num <= subLines / 2; num++) {
      const diff = num * subSize;
      drawLineAt(diff);
      drawLineAt(-1 * diff);
    }

    drawLine(ctx, half, half, size, '#76d3e6');

    return canvas.toDataURL();
  }


  function resetGrid(size, min, max, container) {
    if (isNaN(size) || size < min || size > max) {
      return;
    }

    const image = createCrossImage(size, 10);

    container.style.backgroundRepeat = 'repeat';
    container.style.backgroundImage = 'url(' + image + ')';
  }


  function main() {
    const sizer = document.querySelector('.gridsize');
    const min = sizer.min;
    const max = sizer.max;
    const container = document.body;
    sizer.addEventListener('change', function(event) {
      resetGrid(Number(event.target.value), min, max, container);
    });
    resetGrid(Number(sizer.value), min, max, container);
  }


  window.addEventListener('DOMContentLoaded', main, false);
})(window, document);
