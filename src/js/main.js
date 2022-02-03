checkUser = async () => {
  if (
    window.location.pathname === '/' // for local dev
    || window.location.pathname === '/semicolon/' // for gh-pages
  ) { return }
  
  const current = Moralis.User.current()
  if (!current) {
    console.log('no user signed in')
    location.href = '/'
  } else {
    console.log('user signed in')
    console.log(current)
  }
}

// Nav Buttons

$("#homeBtn").on("click", () => {
  location.href = "pages/home"
})

$("#readBtn").on("click", () => {
  location.href = "pages/query"
})

$("#writeBtn").on("click", () => {
  location.href = "pages/write"
})
