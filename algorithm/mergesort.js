function mergesort(arr) {
  _mergesort(0, arr.length, arr);
  return arr;
}


function _mergesort(start, num, arr) {
  if (num <= 1) {
    return;
  }

  var m = Math.floor(num / 2);

  _mergesort(start, m, arr);
  _mergesort(start + m, num - m, arr);

  var i, j, k;
  var buffer = new Array(m);
  for (i = 0; i < m; i++) {
    buffer[i] = arr[start + i];
  }

  i = 0;
  j = m;
  k = 0;

  while (i < m && j < num) {
    if (buffer[i] <= arr[j + start]) {
      arr[start + k++] = buffer[i++];
    } else {
      arr[start + k++] = arr[start + j++];
    }
  }
  while (i < m) {
    arr[start + k++] = buffer[i++];
  }
}


function main() {
  var n = 10;
  var arr = new Array(n);
  for (var i = 0; i < n; i++) {
    arr[i] = (Math.random() * 100) | 0;
  }

  console.log(arr);
  mergesort(arr);
  console.log(arr);
}

main();

