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

    var image = createCrossImage(size);

    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundImage = 'url(' + image + ')';
  }

  function createCrossImage(size) {
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var half = (size % 2 === 0) ? (size + 1) / 2 : size / 2;
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, half);
    ctx.lineTo(size, half);
    ctx.moveTo(half, 0);
    ctx.lineTo(half, size);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    return canvas.toDataURL();
  }

  window.addEventListener('DOMContentLoaded', main, false);

})(window, document);
