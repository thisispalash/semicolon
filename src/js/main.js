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