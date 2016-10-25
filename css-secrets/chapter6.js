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
    var dialog = document.querySelector('.css30-2 dialog');
    dialog.showModal();
  });

  document.querySelector('.css30-2 img').addEventListener('click', function() {
    var dialog = document.querySelector('.css30-2 dialog');
    dialog.close();
  });

  document.querySelector('.css31 button').addEventListener('click', function() {
    var dialog = document.querySelector('.css31 dialog');
    dialog.showModal();
    document.body.classList.add('css31-1');
  });

  document.querySelector('.css31 img').addEventListener('click', function() {
    var dialog = document.querySelector('.css31 dialog');
    dialog.close();
    document.body.classList.remove('css31-1');
  });

});
