import sha256 from 'js-sha256'

// import shav256 from '../assets/forge_sha256'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {

}

export function hash (secret, service) {
  var timeA = Date.now()

  var combined = '-'
  try {
    combined = secret + '-' + service
  } finally {
    for (var i = 0; i < 65536; i++) {
      combined = sha256(combined)
    }
  }
  combined = combined.slice(0, 16)
  combined = 'z' + combined.slice(1, 16)
  combined = combined.slice(0, 4) + '7' + combined.slice(5, 16)
  combined = combined.slice(0, 9) + 'H' + combined.slice(10, 16)
  combined = combined.slice(0, 15) + '!'

  var elapsedTime = Date.now() - timeA
  console.log(elapsedTime)
  console.log(combined)
  return combined
}
