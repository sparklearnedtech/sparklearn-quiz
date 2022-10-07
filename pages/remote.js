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
    socket.on('server', msg => {
      console.log(msg)
    })
  }, [])
  return (
    <div className='d-flex j-content-center'>
      <button
        className='btn-correct'
        onClick={() => {
          socket.emit('hello', 'correct')
        }}
      >
        Correct
      </button>
      <button
        className='btn-wrong'
        onClick={() => {
          socket.emit('hello', 'wrong')
        }}
      >
        Wrong
      </button>
      <button
        className='btn-previous'
        onClick={() => {
          socket.emit('hello', 'previous')
        }}
      >
        Previous
      </button>
      <button
        className='btn-next'
        onClick={() => {
          socket.emit('hello', 'next')
        }}
      >
        Next
      </button>
    </div>
  )
}
