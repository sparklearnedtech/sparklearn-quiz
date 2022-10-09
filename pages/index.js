import Head from 'next/head'
import Image from 'next/image'
import Register from '../components/Register'
import Questions from '../components/Questions'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import CurrentScore from '../components/CurrentScore'
import FinalScore from '../components/FinalScore'
import Leaderboard from '../components/Leaderboard'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Home ({ questions }) {
  const [finalQuestionSet, setFinalQuestionSet] = useState({})
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [score, setScore] = useState(0)
  const [gameStart, setGameStart] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const [leaderboard, setLeaderboard] = useState({})
  const [timeLeft, setTimeLeft] = useState(10)
  const [timerOn, setTimerOn] = useState(true)
  const [timerKey, setTimerKey] = useState(0)

  const fetchLeaderboard = async () => {
    const result = await fetch('/api/leaderboard')

    const data = await result.json()
    setLeaderboard(data)
  }

  function correct () {
    setActiveQuestion(activeQuestion + 1)
    setScore(score + activeQuestion.score)
    setTimerKey(timerKey + 1)
  }

  function UrgeWithPleasureComponent () {
    return (
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={timerOn}
        duration={timeLeft}
        initialRemainingTime={10}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          setActiveQuestion(activeQuestion + 1)
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    )
  }

  useEffect(() => {
    fetchQuestions()
    fetchLeaderboard()
  }, [])

  useEffect(() => {
    // setTimerOn()
    if (activeQuestion >= 9) {
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ nickname, email, score })
      })
      console.log('Finished')

      fetchQuestions()
      setGameFinished(true)
    }
    console.log(activeQuestion)
  }, [activeQuestion])

  const resetHandler = () => {
    console.log('test')
    setGameStart(false)
    setGameFinished(false)
    setNickname('')
    setEmail('')
    setScore(0)
    setActiveQuestion(0)
    fetchLeaderboard()
  }

  const handleGameStatus = () => {
    setGameStart(true)
  }

  const fetchQuestions = () => {
    let questionSet = []

    const baseIndex = Math.floor(Math.random() * questions.length)

    let j = baseIndex

    let k = 0

    for (let i = 0; i < 10; i++) {
      if (i + j > questions.length - 1) {
        questionSet[i] = questions[k++]
      } else {
        questionSet[i] = questions[i + j]
      }
    }

    for (let k = 0; k < 1000; k++) {
      let randNum = Math.floor(Math.random() * questionSet.length)

      let temp = questionSet[0]

      questionSet[0] = questionSet[randNum]
      questionSet[randNum] = temp
    }

    setFinalQuestionSet(questionSet)
  }

  // console.log(finalQuestionSet[0]);
  return (
    <div className={styles.container}>
      <Head>
        <title>SparkLearn EdTech Quiz</title>
        <meta name='description' content='Quiz for SparkLearn EdTech Booth' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Leaderboard topPlayers={leaderboard} />
        {!gameStart && !gameFinished ? (
          <Register
            nickname={nickname}
            email={email}
            handleGameStatus={handleGameStatus}
            setEmail={setEmail}
            setNickname={setNickname}
          />
        ) : !gameFinished ? (
          <>
            <CurrentScore nickname={nickname} score={score} />
            <Questions
              currentQuestion={finalQuestionSet[activeQuestion]}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              setScore={setScore}
              score={score}
              timer={UrgeWithPleasureComponent}
              correct={correct}
            />
          </>
        ) : (
          <FinalScore
            finalScore={score}
            nickname={nickname}
            resetHandler={resetHandler}
          />
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  const questions = [
    {
      id: 0,
      question:
        'Q1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 2
    },
    {
      id: 1,
      question:
        'Q2  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 2,
      question:
        'Q3  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 3
    },
    {
      id: 3,
      question:
        'Q4  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 4,
      question:
        'Q5  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 2
    },
    {
      id: 5,
      question:
        'Q6  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 6,
      question:
        'Q7  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 2
    },
    {
      id: 7,
      question:
        'Q8  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 2
    },
    {
      id: 8,
      question:
        'Q9  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 3
    },
    {
      id: 9,
      question:
        'Q10  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 3
    },
    {
      id: 10,
      question:
        'Q11  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 4
    },
    {
      id: 11,
      question:
        'Q12  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 12,
      question:
        'Q13  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 13,
      question:
        'Q14  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 1
    },
    {
      id: 14,
      question:
        'Q15  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat alias',
      score: 3
    }
  ]

  return {
    props: { questions }
  }
}
