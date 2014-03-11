var BLOCK_SIZE = 15;

var img = new Image();
var canvas = document.getElementsByClassName('dots-canvas')[0]
var ctx = canvas.getContext('2d');

img.onload = function() {
  canvas.width = 800;
  canvas.height = 800;
  ctx.drawImage(img, 0, 0, 800, 800);


  for (var y=0; y < canvas.height; y+=BLOCK_SIZE) {
    for (var x=0; x < canvas.width; x+=BLOCK_SIZE) {
      var imgData = ctx.getImageData(x, y, BLOCK_SIZE, BLOCK_SIZE);
      var data = imgData.data;

      total_red   = 0;
      total_green = 0;
      total_blue  = 0;

      for (var i = 0; i < data.length; i += 4) {
        var red   = data[i];
        var green = data[i+1];
        var blue  = data[i+2];

        total_red   += red;
        total_green += green;
        total_blue  += blue;
      }

      var color = Color().rgb(total_red/data.length*4, total_green/data.length*4, total_blue/data.length*4);

      ctx.clearRect (x, y, BLOCK_SIZE, BLOCK_SIZE);

      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + BLOCK_SIZE/2, y + BLOCK_SIZE/2, BLOCK_SIZE/2 * (1 - color.luminosity()), 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
    }
  }


}
img.src = 'obama-square.jpg';
