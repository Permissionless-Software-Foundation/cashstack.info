/*
  Run this script with `npm run pub` after running `npm run build`

  This script will upload the compiled site to Filecoin.
*/

const FILE_PATH = './build'

const { Web3Storage, getFilesFromPath } = require('web3.storage')
const fs = require('fs')
const fs2 = require('fs').promises

async function publish() {
  try {
    // Get the Filecoin token from the environment variable.
    const filecoinToken = process.env.FILECOIN_TOKEN
    if (!filecoinToken) {
      throw new Error(
        'Filecoin token not detected. Get a token from https://web3.storage and save it to the FILECOIN_TOKEN environment variable.'
      )
    }

    // Get the WIF for updating Trout's blog from the environment variable.
    const troutWif = process.env.TROUT_BLOG_WIF
    if (!troutWif) {
      throw new Error(
        'WIF for troutsblog.com not detect. Add it to the TROUT_BLOG_WIF environment variable.'
      )
    }

    // Get a list of all the files to be uploaded.
    const fileAry = await getFileList()
    // console.log(`fileAry: ${JSON.stringify(fileAry, null, 2)}`)

    // Upload the files to Filecoin.
    const cid = await uploadToFilecoin(fileAry, filecoinToken)
    // const cid = 'bafybeibgekzxiqr7irgs26g5pw5sv6xtvfiihccyagpmn7anzl6ffb2xc4'
    console.log('Content added with CID:', cid)
    console.log(`https://${cid}.ipfs.dweb.link`)

    // Save the CID to a JSON file, so the app can pick it up.
    await fs2.writeFile('./static/filecoin.json', JSON.stringify({cid}, null, 2))

  } catch (err) {
    console.error(err)
  }
}
publish()

function getFileList() {
  const fileAry = []

  return new Promise((resolve, reject) => {
    fs.readdir(FILE_PATH, (err, files) => {
      if (err) return reject(err)

      files.forEach(file => {
        // console.log(file)
        fileAry.push(`${FILE_PATH}/${file}`)
      })

      return resolve(fileAry)
    })
  })
}

async function uploadToFilecoin(fileAry, token) {
  const storage = new Web3Storage({ token })

  const files = []
  for (let i = 0; i < fileAry.length; i++) {
    const thisPath = fileAry[i]
    // console.log('thisPath: ', thisPath)

    const pathFiles = await getFilesFromPath(thisPath)
    // console.log('pathFiles: ', pathFiles)

    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files. Please wait...`)
  const cid = await storage.put(files)

  return cid
}
