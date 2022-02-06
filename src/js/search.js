function lookupHSL() {
  console.log('looking up by HSL..')
  let hue = $('#h_val').val()
  let sat = $('#s_val').val()
  let lum = $('#l_val').val()
  let cv = document.getElementById('myCanvas')
  localStorage.setItem('hue', hue)
  localStorage.setItem('sat', sat)
  localStorage.setItem('lum', lum)
  localStorage.setItem('img', cv.toDataURL())
  location.href = 'list'
}

function lookupID() {
  console.log('looking up by ID..')
  let id = $('#tokenID').val()
  localStorage.setItem('tokenID', id)
  location.href = 'read'
}

console.log('end `search.js`')