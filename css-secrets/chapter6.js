window.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.css32-1 button').addEventListener('click', function() {
    var img = document.querySelector('.css32-1 img');
    img.classList.toggle('css32-1-1');
  });

  document.querySelector('.css32-1 img').addEventListener('click', function() {
    var img = document.querySelector('.css32-1 img');
    img.classList.add('css32-1-1');
  });

  document.querySelector('.css32-2 button').addEventListener('click', function() {
    var dialog = document.querySelector('.css32-2 dialog');
    dialog.showModal();
  });

  document.querySelector('.css32-2 img').addEventListener('click', function() {
    var dialog = document.querySelector('.css32-2 dialog');
    dialog.close();
  });

  document.querySelector('.css33 button').addEventListener('click', function() {
    var dialog = document.querySelector('.css33 dialog');
    dialog.showModal();
    document.body.classList.add('css33-1');
  });

  document.querySelector('.css33 img').addEventListener('click', function() {
    var dialog = document.querySelector('.css33 dialog');
    dialog.close();
    document.body.classList.remove('css33-1');
  });

});
