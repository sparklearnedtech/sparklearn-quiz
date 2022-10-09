import Head from 'next/head'
import Image from 'next/image'
import Register from '../components/Register'
import Questions from '../components/Questions'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import CurrentScore from '../components/CurrentScore'
import FinalScore from '../components/FinalScore'
import Leaderboard from '../components/Leaderboard'

export default function Home ({ questions }) {
  const numQ = 10
  const [finalQuestionSet, setFinalQuestionSet] = useState({})
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [score, setScore] = useState(0)
  const [gameStart, setGameStart] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)

  const [correctAnswer, setCorrectAnswer] = useState()
  const [leaderboard, setLeaderboard] = useState({})

  const fetchLeaderboard = async () => {
    const result = await fetch('/api/leaderboard')

    const data = await result.json()
    setLeaderboard(data)
  }

  useEffect(() => {
    fetchQuestions()
    fetchLeaderboard()
  }, [])

  useEffect(() => {
    if (activeQuestion >= numQ) {
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ nickname, email, score })
      })
      console.log('Finished')

      fetchQuestions()
      setGameFinished(true)
    }
    console.log(activeQuestion)
    setTimeLeft(10)
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
    window.location.reload()
  }

  const handleGameStatus = () => {
    setGameStart(true)
  }

  const fetchQuestions = () => {
    let questionSet = []

    const baseIndex = Math.floor(Math.random() * questions.length)

    let j = baseIndex

    let k = 0

    for (let i = 0; i < numQ; i++) {
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
        <div className='d-flex j-content-center'>
          <h1
            style={{ position: 'absolute', top: '20px', color: 'white' }}
            className='text-center'
          >
            Test Your Blockchain Knowledge!
          </h1>
        </div>

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
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
            />
          </>
        ) : (
          <FinalScore
            finalScore={score}
            nickname={nickname}
            resetHandler={resetHandler}
          />
        )}
        {/* <div className='d-flex j-content-center'>
          <marquee
            style={{ color: 'white', position: 'absolute', bottom: '40px' }}
          >
            <h1>
              10,000 SRK TOKEN Grand Prize | 10,000 SRK TOKEN Grand Prize |
              10,000 SRK TOKEN Grand Prize | 10,000 SRK TOKEN Grand Prize |
              10,000 SRK TOKEN Grand Prize
            </h1>
          </marquee>
        </div> */}
        <div className='d-flex j-content-center'>
          <marquee
            style={{ color: 'white', position: 'absolute', bottom: '40px' }}
          >
            <h1>
              10,000 SRK TOKEN Grand Prize | 10,000 SRK TOKEN Grand Prize |
              10,000 SRK TOKEN Grand Prize | 10,000 SRK TOKEN Grand Prize |
              10,000 SRK TOKEN Grand Prize
            </h1>
          </marquee>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  const questions = [
    {
      id: 0,
      question:
        'The first open-source blockchain with smart contract functionality.',
      score: 5,
      answer: 'ETHEREUM'
    },
    {
      id: 1,
      question: 'The native token of Ethereum.',
      score: 4,
      answer: 'ETHER'
    },
    {
      id: 2,
      question: 'Native token of Ownly.',
      score: 3,
      answer: 'OWN'
    },
    {
      id: 3,
      question: 'Native token ni SparkPoint.',
      score: 3,
      answer: 'SRK TOKEN'
    },
    {
      id: 4,
      question: 'Native token of MetaGaming Guild.',
      score: 3,
      answer: 'MGG'
    },
    {
      id: 5,
      question: 'Definition of DApps.',
      score: 2,
      answer: 'DECENTRALIZED APPS'
    },
    {
      id: 6,
      question: 'New game to be launched by MGG.',
      score: 3,
      answer: 'METASAGA WARRIORS'
    },
    {
      id: 7,
      question: 'Meaning of POS.',
      score: 4,
      answer: 'PROOF OF STAKE'
    },
    {
      id: 8,
      question: 'Meaning of POW.',
      score: 4,
      answer: 'PROOF OF WORK'
    },
    {
      id: 9,
      question: 'Ilang years na ang SparkPoint.',
      score: 2,
      answer: '4 YEARS'
    },
    {
      id: 10,
      question: 'Meaning of NFT',
      score: 3,
      answer: 'NON-FUNGIBLE TOKEN'
    },
    {
      id: 11,
      question: 'Creator of Bitcoin',
      score: 5,
      answer: 'SATOSHI NAKAMOTO'
    },
    {
      id: 12,
      question: 'Most expensive crypto.',
      score: 3,
      answer: 'BITCOIN'
    },
    {
      id: 13,
      question: 'A decentralized digital ledger.',
      score: 5,
      answer: 'BLOCKCHAIN'
    },
    {
      id: 14,
      question: 'Physical device that stores crypto assets’ digital keys',
      score: 5,
      answer: 'HARDWARE WALLET'
    }
  ]

  return {
    props: { questions }
  }
}
