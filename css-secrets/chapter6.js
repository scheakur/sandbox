window.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.css30-1 button').addEventListener('click', function() {
    var img = document.querySelector('.css30-1 img');
    img.classList.toggle('css30-1-1');
  });

  document.querySelector('.css30-1 img').addEventListener('click', function() {
    var img = document.querySelector('.css30-1 img');
    img.classList.add('css30-1-1');
  });

  document.querySelector('.css30-2 button').addEventListener('click', function() {
    var dialog = document.querySelector('dialog');
    dialog.showModal();
  });

  document.querySelector('.css30-2 img').addEventListener('click', function() {
    var dialog = document.querySelector('dialog');
    dialog.close();
  });

});
