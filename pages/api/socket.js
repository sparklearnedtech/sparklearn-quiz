import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    res.socket.on('sdfdgfd', msg => {
      console.log(msg)
    })
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    io.on('connection', socket => {
      socket.on('hello', arg => {
        console.log(arg) // world
        socket.emit('server', 'im your server')
      })
      socket.emit('server', 'this is from server')
      console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    })
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler
