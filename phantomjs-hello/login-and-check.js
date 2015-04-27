var system = require('system');
var username = system.args[1];
var password = system.args[2];

var url = 'https://github.com'
var loginUrl = 'https://github.com/login'

var page = require('webpage').create();

page.onInitialized = function() {
  page.evaluate(function() {
    window.setTimeout(function() {
      window.callPhantom('do next');
    }, 1000);
  });
};

function doAll(functions) {
  function doNext() {
    var fn = functions.shift();
    if (!fn) {
      page.onCallback = function() {};
      return;
    }
    fn();
  }

  page.onCallback = function(data) {
    if (data === 'do next') {
      doNext();
    }
  };

  doNext();
}

function check() {
  var expected = username;

  page.open(url, function() {
    var result = page.evaluate(function(expected) {
      var actual = document.querySelector('.account-switcher .js-select-button').textContent;
      return {
        ok: expected === actual,
        expected: expected,
        actual: actual,
      };
    }, expected);

    if (reuslt.ok) {
      log('.');
    } else {
      log('\n!\n' + result.actual);
    }
  });
}

function log(text) {
  system.stdout.write(text);
}

function times(n, o) {
  var a = new Array(n);
  for (var i = 0; i < n; i++) {
    a[i] = o;
  }
  return a;
}

doAll([
  function openLogin() {
    page.open(loginUrl);
  },
  function login() {
    page.evaluate(function(name, pass) {
      document.getElementById('login_field').value = name;
      document.getElementById('password').value = pass;
      document.querySelector('form').submit();
    }, username, password);
  },
].concat(times(3, check)).concat([
  function exit() {
    console.log('finished');
    phantom.exit();
  }
]));
