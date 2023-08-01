const fs = require('fs')
const path = require('path')

fs.unlink(path.join(__dirname, 'text.txt'), ()=>console.log('done'))