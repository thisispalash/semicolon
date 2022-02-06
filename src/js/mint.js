async function mint() {
  console.log('prepping mint')
  $('#mintBtn').prop('disabled', true)
  let cv = document.getElementById("myCanvas")
  let img = cv.toDataURL()
  let hue = $('#h_val').val()
  let sat = $('#s_val').val()
  let lum = $('#l_val').val()
  let text = $('#content').val()

  let obj = {
    "version": 0,
    "hue": hue,
    "sat": sat,
    "lum": lum,
    "text": text,
    "img": img
  }

  const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(obj))});
  await file.saveIPFS();
  
  // Moralis.executeFunction stuff below
  const recepient = Moralis.User.current().get('accounts')[0]
  const url = file._ipfs
  let abi = await fetch('../../contracts/abi.json')
  const ABI = await abi.json() 

  const sendOptions = {
    contractAddress: '0x964d85d9D41615450dFC90c6571a9bF552aCE015',
    functionName: 'mintStory',
    abi: ABI,
    params: {
      _newMessage: "Hello Moralis",
      _creator: recepient,
      tokenURI: url
    },
  };

  const txn = await Moralis.executeFunction(sendOptions);
  console.log(txn.hash)
  console.log(txn)

  $('#heading').html('Confirming txn') // inform user
  await txn.wait(5);



}