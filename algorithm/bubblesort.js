function bubblesort(arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}


function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}


function main() {
  var n = 10;
  var arr = new Array(n);
  for (var i = 0; i < n; i++) {
    arr[i] = (Math.random() * 100) | 0;
  }

  console.log(arr);
  bubblesort(arr);
  console.log(arr);
}


main();
