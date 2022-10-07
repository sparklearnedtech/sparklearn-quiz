import React, { useEffect, useRef } from 'react'

export default function Questions ({
  currentQuestion,
  activeQuestion,
  setActiveQuestion
}) {
  console.log(currentQuestion)
  return (
    <div>
      {currentQuestion.question}

      <button
        onClick={() => {
          setActiveQuestion(activeQuestion + 1)
        }}
      >
        Answer
      </button>
    </div>
  )
}
