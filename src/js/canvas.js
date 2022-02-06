var cv, img, css_root;
var hue, sat, lum;

$("#h_val").on("input", () => {
  hue = $("#h_val").val()
  css_root.style.setProperty('--hue', hue)
  console.log(hue)
  updateCanvas()
})
$("#s_val").on("input", () => {
  sat = $("#s_val").val()/2 + 25.0 // limit between 0.25 and 0.75
  updateCanvas()
})
$("#l_val").on("input", () => {
  lum = $("#l_val").val()/2 + 25.0 // limit between 0.25 and 0.75
  updateCanvas()
})

function updateCanvas() {
  var ctx = cv.getContext("2d");
  console.log(hue,sat,lum)
  ctx.fillStyle = 'hsl('+hue+','+sat+'%,'+lum+'%)'
  ctx.fillRect(0,0,400,400)
  ctx.drawImage(img,0,0);
}

function loadCanvas() {
  cv = document.getElementById("myCanvas")
  img = document.getElementById("arms")
  css_root = document.querySelector(':root')
  hue=0
  sat=100
  lum=50
  $("#h_val").val(hue)
  $("#s_val").val(sat)
  $("#l_val").val(lum)
  css_root.style.setProperty('--hue', hue)
  updateCanvas()
}

console.log('end `canvas.js`')