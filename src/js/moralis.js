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
  var meta = []
  arr.forEach(item => {
    $.ajax({
      url: item.metadata,
      success: (res) => { meta.push(res) }
    })
  })
  return meta
}

function displayNFTs(_id, arr) {
  let parent = $('#'+_id)
  if (!arr) {
    let div = `
      <div class="row">
        <div class="container">
          No Stories minted
        </div>
      </div>
    `
    parent.appendChild(div)
    return;
  }

  arr.forEach( (item) => {
    let div = `
      <div class="row">
        <div class="card bg-dark mb-3">
          <img src="${item.img}" class="card-img-top">
        </div>
      </div>
    `
    parent.appendChild(div)
  })
}

async function checkNFTs() {
  const NFTs = await Moralis.Web3API.account.getNFTs({ chain: 'mumbai' });
  var mints = [], remints = [];
  if(!NFTs.total) {
    NFTs.result.forEach(nft => {
      if (nft.symbol === "SMF") mints.push(nft);
      if (nft.symbol === "reSMF") remints.push(nft);
    });

    mint_meta = getMetadata(mints)
    remint_meta = getMetadata(remints)

    // Display NFT
    displayNFTs('ownmint', mint_meta)
    displayNFTs('remint', remint_meta)

  }
}


console.log('end `moralis.js`')