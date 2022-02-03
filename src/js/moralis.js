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

console.log('end `moralis.js`')