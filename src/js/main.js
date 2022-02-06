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
  console.log('going home..')
  location.href = "home"
})

$("#readBtn").on("click", () => {
  console.log('going to search..')
  location.href = "query"
})

$("#writeBtn").on("click", () => {
  console.log('going to write..')
  location.href = "write"
})

console.log('end `main.js`')