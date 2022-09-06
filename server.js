const http = require('http')

const PORT = process.env.PORT

const server = http.createServer()

server.listen(PORT)