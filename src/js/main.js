checkUser = async () => {
  if (
    window.location.pathname === '/' // for local dev
    || window.location.pathname === '/semicolon/' // for gh-pages
  ) { return }
  
  const current = Moralis.User.current()
  if (!current) {
    console.log('no user signed in')
    location.href = '/semicolon/' // for gh-pages
    location.href = '/'
  } else {
    console.log('user signed in')
    const acc = current.get('accounts')[0]
    $('footer').html(acc)
    Moralis.enableWeb3()
  }
}

function readStory(_id) {
  console.log(`loading story numbah ${_id}`)
  localStorage.setItem('tokenID', _id)
  location.href = 'read'
}

// Nav Buttons

$("#homeBtn").on("click", () => {
  location.href = "home"
})

$("#readBtn").on("click", () => {
  location.href = "query"
})

$("#writeBtn").on("click", () => {
  location.href = "write"
})
