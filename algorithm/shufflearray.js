function shuffle(arr) {
  var a = arr.concat(); // copy array
  var newArr = [];
  while (a.length > 0) {
    var r = Math.floor(Math.random() * a.length);
    newArr.push(a[r]);
    a.splice(r, 1);
  }
  return newArr;
}


function main() {
  var arr = [1, 2, 3];

  var result = {};

  for (var i = 0; i < 1000000; i++) {
    var v = shuffle(arr).join('');
    if (!result[v]) {
      result[v] = 0;
    }
    result[v] += 1;
  }

  console.log(result);
}

main();

