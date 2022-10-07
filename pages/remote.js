import React from 'react'
import { useState, useEffect } from 'react'
import io from 'Socket.IO-client'

let socket

export default function remote () {
  useEffect(() => {
    fetch('/api/socket')
    socket = io()
    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])
  return (
    <div className='d-flex j-content-center'>
      <button
        className='btn-correct'
        onClick={() => {
          socket.emit('hello', 'hehehe')
          console.log('Correct btn')
        }}
      >
        Correct
      </button>
      <button className='btn-wrong'>Wrong</button>
      <button className='btn-previous'>Previous</button>
      <button className='btn-next'>Next</button>
    </div>
  )
}
