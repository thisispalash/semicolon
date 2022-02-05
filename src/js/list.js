function initPage() {
  let hue = localStorage.getItem('hue')
  let sat = localStorage.getItem('sat')
  let lum = localStorage.getItem('lum')
  let heading = hue + '; ' + sat + '; ' + lum
  $('#heading').html(heading)
}