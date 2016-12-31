window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.video');
  const image = document.querySelector('.image');
  const canvas = document.querySelector('.canvas');
  const context = canvas.getContext('2d');
  let media = null;

  navigator.getUserMedia({
    video: true,
  }, (userMedia) => {
    video.src = window.URL.createObjectURL(userMedia);
    media = userMedia;
  }, () => {
    console.log('rejected');
  });

  video.addEventListener('click', () => {
    if (!media) {
      return;
    }

    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    context.drawImage(video, 0, 0);
    image.src = canvas.toDataURL('image/png');
  }, false) ;
});
