const serverUrl = "https://lsf3uffwotp9.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "87fiNCDSjxSotje6H9fPlgNBzOYZRkdrQ3hSsRn5"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });

async function login() {
  console.log('hello')
  try {
    user = await Moralis.authenticate();
    console.log('signed in!')
    location.href = 'pages/home'
  } catch (error) {
    console.log(error);
  }
}

function getMetadata(arr) {
  let meta = []
  arr.forEach(item => {
    console.log(item)
    $.ajax({
      url: item.token_uri,
      async: false, // bad practice
      success: (res) => { meta.push([item.token_id,res]) }
    })
  })
  console.log(meta)
  return meta
}

function displayNFTs(_id, arr) {
  console.log(_id, arr.length)
  let parent = $('#'+_id)
  let code = parent.html()

  if (arr.length === 0) {
    console.log(arr.length)
    console.log(arr[0])
    let div = `
    <div class="row">
      <div class="container">
        No Stories minted
      </div>
    </div>
    `
    code += div
  } else {

    arr.forEach( item => {
      let [_id, meta] = item
      let div = `
        <div class="row">
          <div class="card bg-dark mb-3">
            <img src="${meta.img}" class="card-img-top" onClick="readStory(${_id})" style="cursor:pointer">
          </div>
        </div>
      `
      code += div
    })
  }
  parent.html(code)
}

async function checkNFTs() {
  const NFTs = await Moralis.Web3API.account.getNFTs({ chain: 'mumbai' });
  var mints = [], remints = [];
  var mint_meta = [], remint_meta = [];
  if(NFTs.total > 0) {
    NFTs.result.forEach(nft => {
      if (nft.symbol === "SMF") mints.push(nft);
      if (nft.symbol === "reSMF") remints.push(nft);
    });
    mint_meta = getMetadata(mints)
    remint_meta = getMetadata(remints)
  }

  displayNFTs('ownmint', mint_meta)
  displayNFTs('remint', remint_meta)
}


console.log('end `moralis.js`')