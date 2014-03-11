var img = new Image();
img.onload = function() {
  console.log(img.width);
  var canvas = document.getElementsByClassName('dots-canvas')[0]
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 800, 800);
}
img.src = 'obama.jpg';
