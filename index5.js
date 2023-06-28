// eslint-disable-next-line import/no-unresolved
const request = require('request')

function getGoogleHomePage() {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', (error, response, body) => {
      if (error) {
        console.error('error:', error)
        reject(error)
      }
      console.log('statusCode:', response && response.statusCode)
      console.log('body:', body)
      resolve(body)
    })
  })
}

getGoogleHomePage()
  .then(result => {
    console.log('RESULT==>', result)
  })
  .catch(error => {
    console.error('ERROR==>', error)
  })
