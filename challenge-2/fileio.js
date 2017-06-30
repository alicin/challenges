const fs = require('fs');
const files = ['fileone.txt','filetwo.txt','filethree.txt'];
const lines = new Array(files.length)
let totalFilesRead = 0

const then = Date.now()
for (let i = 0; i < files.length; i++) {
  if (process.argv[2] === 'stream') {
    readFileStream(i)
  } else {
    readFile(i)
  }
}

function readFile (index) {
  fs.readFile(__dirname + '/' + files[index], (error, contents) => {
    if (error) {
      lines[index] = error.message
    } else {
      lines[index] = contents.toString().split('\n')[0]
    }
    totalFilesRead++
    if (totalFilesRead === files.length) printLines()
  })
}

function readFileStream (index) {
  // Added this function just to benchmark the difference 
  // between reading the whole file and only the first line.
  // For our test group it seems this one is ~10% faster.
  // you can test this by adding "stream" as a command line argument
  // node fileio stream
  const stream = fs.createReadStream(__dirname + '/' + files[index], {
    flags: 'r',
    encoding: 'utf-8',
    fd: null,
    mode: 0666,
    bufferSize: 32 * 1024
  })

  let fileData = ''
  stream.on('data', data => {
    fileData += data

    if(fileData.indexOf('\n') > -1){
      stream.destroy()
      lines[index] = fileData.split('\n')[0]
      totalFilesRead++
      if (totalFilesRead === files.length) printLines()
    }
  })

  stream.on('error', error => {
    lines[index] = error.message
  })
}

function printLines () {
  lines.forEach(line => {
    console.log(line)
  })
  benchmark()
}

function benchmark () {
  console.log(`Job's done in ${Date.now() - then} milliseconds.`)
}
