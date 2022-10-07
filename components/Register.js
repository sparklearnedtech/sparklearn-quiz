import React, { useRef, useEffect } from 'react'

export default function Register ({
  handleGameStatus,
  nickname,
  email,
  setNickname,
  setEmail
}) {
  const currentInput = useRef(null)

  useEffect(() => {
    currentInput.current.focus()
  }, [])

  return (
    <div className='d-flex j-content-center'>
      <div className='card'>
        <form onSubmit={handleGameStatus}>
          <input
            ref={currentInput}
            type='text'
            placeholder='Enter your nickname'
            required
            value={nickname}
            onChange={e => {
              setNickname(e.target.value)
            }}
          />
          <input
            type='email'
            placeholder='Enter your email'
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}
