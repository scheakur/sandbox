function quicksort(arr) {
  _quicksort(0, arr.length - 1, arr);
  return arr;
}

function _quicksort(bottom, top, arr) {
  if (top - bottom <= 0) {
    return;
  }
  var pivot = arr[bottom];
  var lower = bottom;
  var upper = top;
  while (true) {
    while (arr[lower] <= pivot) {
      lower++;
    }
    while (arr[upper] > pivot) {
      upper--;
    }
    if (lower >= upper) {
      break;
    }
    swap(lower, upper, arr);
  }

  swap(bottom, upper, arr);

  _quicksort(bottom, upper - 1, arr);
  _quicksort(upper + 1, top, arr);
}

function swap(a, b, arr) {
  var t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

function main() {
  var n = 10;
  var arr = new Array(n);
  for (var i = 0; i < n; i++) {
    arr[i] = (Math.random() * 100) | 0;
  }

  console.log(arr);
  quicksort(arr);
  console.log(arr);
}

main();
