function div(a, b) {
  return Math.floor(a / b);
}


// 1 = Monday, ... 7 = Sunday
function dayOfWeek(y, m, d) {
  var Y = y % 100;
  var C = div(y, 100);
  var G = 5 * C + div(C, 4);
  return ((d + div(26 * (m + 1), 10) + Y + div(Y, 4) + G + 5) % 7) + 1;
}


function isWeekDay(y, m, d) {
  if (m < 3) {
    y -= 1;
    m += 12;
  }
  return dayOfWeek(y, m, d) < 6;
}


function maxDay(y, m) {
  if (m !== 2) {
    return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
  }
  return isLeapYear(y) ? 29 : 28;
};


function isLeapYear(y) {
  if (y % 400 === 0) {
    return true;
  }
  return (y % 4 === 0) && (y % 100 !== 0);
}


function listWeekDays(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var max = maxDay(y, m);
  var weekDays = [];

  for (var i = 0; i < max; i++) {
    var d = i + 1;
    if (isWeekDay(y, m, d)) {
      weekDays.push(d);
    }
  }

  return weekDays;
}


console.log(listWeekDays(new Date(2015, 7, 10))); // 2015-08-10
