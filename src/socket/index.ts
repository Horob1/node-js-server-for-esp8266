import { Server as HttpServer } from 'http'

import { Server } from 'socket.io'
import { getDB } from '~/config/mongodb'

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    /* options */
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true
  })

  io.on('connection', async (socket) => {
    console.log('User connected:', socket.id)

    socket.on('connect_error', (err) => {
      console.log('Connection error:', err.message)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${reason}`)
    })
  })
}
