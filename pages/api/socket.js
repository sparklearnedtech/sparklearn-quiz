import WebSocket, { WebSocketServer } from 'ws'

export default function handler (req, res) {
  try {
    const wss = new WebSocketServer({
      port: 8080
    })

    wss.on('connection', function connection (ws) {
      ws.on('message', function message (data) {
        console.log('received: %s', data)
        ws.send(`server: ${data}`)
      })
    })
  } catch (error) {}
  res.end()
}
