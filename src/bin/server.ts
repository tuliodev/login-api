const application = require('../app')
const http = require('http')

const port = 3333

application.listen(port)

console.log(`Running on port ${port}`)
