window.addEventListener('DOMContentLoaded', function() {

  function addStyleSheet(fileName) {
    var head = document.head;
    var link = document.createElement('link');

    link.classList.add('css-secrets');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = fileName;

    head.appendChild(link);
  }


  function removeStyleSheets() {
    var sheets = document.head.querySelectorAll('.css-secrets');

    for (var i = 0; i < sheets.length; i++) {
      document.head.removeChild(sheets[i]);
    }
  }


  var data = [
    './4.css',
    './5-1.css',
    './5-2.css',
    './5-3.css',
    './5-4.css',
    './6-1.css',
    './6-2.css',
    './6-3.css',
    './6-4.css',
  ];

  function generateLinks() {
    var container = document.querySelector('.links');

    data.forEach(function(fileName) {
      var a = document.createElement('a');

      a.classList.add('link');
      a.href = 'javascript: return false;';

      a.addEventListener('click', function() {
        removeStyleSheets();
        addStyleSheet(fileName);
      });

      var text = document.createTextNode(fileName);

      a.appendChild(text);

      container.appendChild(a);
    });
  }


  window.cssSecretes = {
    addStyleSheet: addStyleSheet,
    removeStyleSheets: removeStyleSheets,
  };


  generateLinks();

});
