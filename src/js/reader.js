async function loadStory() {
  console.log('todo query')
  let tokenID = localStorage.getItem('tokenID')
  let heading = 'Story ID: ' + tokenID
  $('#heading').html(heading)

  const addr = Moralis.User.current().get('accounts')[0] 
  const options = { chain: 'mumbai', address: addr, token_address: '0x964d85d9D41615450dFC90c6571a9bF552aCE015' };
  const NFTs = await Moralis.Web3API.account.getNFTsForContract(options);
  var story, img;

  NFTs.result.forEach( token => {
    if (token.token_id === tokenID) {
      console.log(token)
      $.ajax({
        url: token.token_uri,
        async: false, // bad practice
        success: (res) => { 
          story = res.text
          img = res.img
        }
      })
    }
  });

  if (!story) $('#story').html('token does not exist')
  else {
    $('#story').html(story)
    $('#heading').html(`<img src="${img}" width="100" height="100" id="semicolon"> ${heading}`)
  }
}

async function remint() {
  console.log('reminting...')
  $('#remintBtn').prop('disabled', true)

  let tokenID = localStorage.getItem('tokenID')

  // lookup story contract address
  let abi = await fetch('abi.json')
  const mainABI = await abi.json()
  const readOptions = {
    contractAddress: '0x964d85d9D41615450dFC90c6571a9bF552aCE015',
    functionName: 'getStory',
    abi: mainABI,
    params: {
      _id: tokenID
    }
  };
  const contract = await Moralis.executeFunction(readOptions);

  // build remint metadata
  let img = $('#semicolon').attr('src')
  let obj = {
    'version': 0,
    'img': img,
    'storyID': tokenID
  }

  // save metadata
  const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(obj))});
  await file.saveIPFS();
  
  // build options
  const url = file._ipfs
  const user = Moralis.User.current().get('accounts')[0]
  let abi2 = await fetch('story.json')
  const storyABI = await abi2.json()

  const sendOptions = {
    contractAddress: contract,
    functionName: 'mintNFT',
    abi: storyABI,
    params: {
      recipient: user,
      tokenURI: url
    },
  };

  const txn = await Moralis.executeFunction(sendOptions);
  console.log(txn.hash)
  await txn.wait(5);

  alert('minted and confirmed!')

  location.href = 'home'

}

function stream() {
  console.log('stream opening...')
}