function mul(a, b) {
  var c = 0;
  for (var i = 0; i < 32; i++) {
    if (b & 1) {
      c += a;
    }
    a <<= 1;
    b >>= 1;
  }
  return c;
}

console.log(mul(1, 121));
console.log(mul(296, 1));
console.log(mul(255, 5));
console.log(mul(128, -3));
console.log(mul(-128, 3));
console.log(mul(4, 0));
console.log(mul(0, 2));
console.log(mul(0, 0));
