function loadStory() {
  console.log('todo query')
  let tokenID = localStorage.getItem('tokenID')
  let heading = 'Story ID: ' + tokenID
  $('#heading').html(heading)
  // TODO lookup id on the network
}

function remint() {
  console.log('reminting...')
}

function stream() {
  console.log('stream opening...')
}