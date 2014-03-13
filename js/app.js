var BLOCK_SIZE = 12;

var img = new Image();
var canvas = document.getElementsByClassName('dots-canvas')[0];
canvas.style.display = "none";
var ctx = canvas.getContext('2d');

var pixels = [];

var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

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

      var pixel = two.makeCircle(x + BLOCK_SIZE/2, y + BLOCK_SIZE/2, BLOCK_SIZE/2 * (color.luminosity()));
      pixel.noStroke().fill = "#ff0dff";
      pixels.push(pixel);
    }
  }

  var group = two.makeGroup(pixels);
  var bounds = group.getBoundingClientRect(true);
  group.translation.set(two.width/2 - bounds.right/2, two.height/2 - bounds.bottom/2);
  two.update();

}
img.src = 'images/thedaniel.jpg';
// img.src = 'images/github-mark.png';
