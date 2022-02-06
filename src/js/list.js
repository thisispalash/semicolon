async function initPage() {
  let hue = Number(localStorage.getItem('hue'))
  let sat = Number(localStorage.getItem('sat'))
  let lum = Number(localStorage.getItem('lum'))
  let img = localStorage.getItem('img')
  let heading = hue + '; ' + sat + '; ' + lum
  $('#heading').html(`<img src="${img}" width="75" height="75" id="semicolon" class="img-fluid rounded-start m-2"> ${heading}`)

  const options = { chain: 'mumbai', address: '0x964d85d9D41615450dFC90c6571a9bF552aCE015' };
  const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

  const parent = $('#page')
  let code = parent.html(), flag = true

  NFTs.result.forEach(token => {
    let obj = JSON.parse(token.metadata)
    let h = Number(obj.hue), s = Number(obj.sat), l = Number(obj.lum)
    // ± 10% range in hue then display
    if (h - 36 <= hue && hue <= h + 36) {
      // ensure not too far in `sat` and `lum` too
      if (
        s-20 <= sat && sat <= s+20
        && l-20 <= lum && lum <= l+20
      ) {
        // too few mints for this
      }
      let row = `
        <div class="row">
          <div class="card mb-3 bg-dark">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${obj.img}" class="img-fluid rounded-start m-2" width="300" height="300">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-text">
                    <p>Story Numbah ${token.token_id}</p>
                    <a class="btn btn-lg btn-outline-light" onClick="readStory(${token.token_id})">Read Story</a>
                  </p>
                  <p class="card-text">
                    <small class="text-muted">
                      hue: ${h}, saturation: ${s}, lightness: ${l}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `; code += row
      flag = false
    }
  });
  if (flag) {
    code += `<div class="row"><p class="lead">No matching stories found, please try again!</p></div>`
  }
  parent.html(code)

}

console.log('end `list.js`')