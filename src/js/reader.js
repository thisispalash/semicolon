async function loadStory() {
  console.log('todo query')
  let tokenID = localStorage.getItem('tokenID')
  let heading = 'Story ID: ' + tokenID
  $('#heading').html(heading)
  // TODO lookup id on the network

  const addr = Moralis.User.current().get('accounts')[0] 
  const options = { chain: 'mumbai', address: addr, token_address: '0x964d85d9D41615450dFC90c6571a9bF552aCE015' };
  const NFTs = await Moralis.Web3API.account.getNFTsForContract(options);
  var story;

  NFTs.result.forEach( token => {
    if (token.token_id === tokenID) {
      console.log(token)
      $.ajax({
        url: token.token_uri,
        async: false, // bad practice
        success: (res) => { story = res.text }
      })
    }
  });

  if (!story) $('#story').html('token does not exist')
  else $('#story').html(story)


}

function remint() {
  console.log('reminting...')
}

function stream() {
  console.log('stream opening...')
}