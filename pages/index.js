import Head from 'next/head'
import Image from 'next/image'
import Register from '../components/Register'
import Questions from '../components/Questions'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import CurrentScore from '../components/CurrentScore'
import FinalScore from '../components/FinalScore'
import Leaderboard from '../components/Leaderboard'
import Marquee from 'react-fast-marquee'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Home ({ questions }) {
  const numQ = 10
  const [finalQuestionSet, setFinalQuestionSet] = useState({})
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [score, setScore] = useState(0)
  const [gameStart, setGameStart] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const [correctAnswer, setCorrectAnswer] = useState()
  const [leaderboard, setLeaderboard] = useState({})
  const [timeLeft, setTimeLeft] = useState(10)
  const [timerOn, setTimerOn] = useState(true)
  const [timerKey, setTimerKey] = useState(0)
  const [showAns, setShowAns] = useState(false)
  const [status, setStatus] = useState()
  const [btnStatus, setBtnStatus] = useState('')

  const fetchLeaderboard = async () => {
    const result = await fetch('/api/leaderboard')

    const data = await result.json()
    setLeaderboard(data)
  }

  function correct () {
    setTimerOn(false)
    setBtnStatus('btn-disabled')
    setTimeout(() => {
      setActiveQuestion(activeQuestion + 1)
      setScore(score + finalQuestionSet[activeQuestion].score)
      console.log(finalQuestionSet[activeQuestion].score)
    }, 2000)
  }

  function wrong () {
    setShowAns(true)
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
          wrong()
          console.log('Wrong')
          setBtnStatus('btn-disabled')
          setTimeout(() => {
            setActiveQuestion(activeQuestion + 1)
          }, 2000)
        }}
      >
        {renderTime}
      </CountdownCircleTimer>
    )
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className='timer'>Too late...</div>
    }

    return (
      <div className='timer'>
        <div className='text'>Remaining</div>
        <div className='value'>{remainingTime}</div>
        <div className='text'>seconds</div>
      </div>
    )
  }

  useEffect(() => {
    randomizer(numQ, questions, setFinalQuestionSet)
    fetchLeaderboard()
    setBtnStatus('')
  }, [])

  useEffect(() => {
    if (activeQuestion >= numQ) {
      fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ nickname, email, score })
      })
      console.log('Finished')

      randomizer(numQ, questions, setFinalQuestionSet)
      setGameFinished(true)
    }
    setShowAns(false)
    setTimerKey(timerKey + 1)
    setTimerOn(true)
    setStatus()
    setBtnStatus('')
  }, [activeQuestion])

  const resetHandler = () => {
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

  const randomizer = (numItems, items, setter) => {
    let itemSet = []

    const baseIndex = Math.floor(Math.random() * items?.length)

    let j = baseIndex

    let k = 0

    for (let i = 0; i < numItems; i++) {
      if (i + j > items?.length - 1) {
        itemSet[i] = items[k++]
      } else {
        itemSet[i] = items[i + j]
      }
    }

    for (let k = 0; k < 1000; k++) {
      let randNum = Math.floor(Math.random() * itemSet.length)

      let temp = itemSet[0]

      itemSet[0] = itemSet[randNum]
      itemSet[randNum] = temp
    }
    setter(itemSet)
  }

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
              numQuestions={numQ}
              currentQuestion={finalQuestionSet[activeQuestion]}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              setScore={setScore}
              score={score}
              timer={UrgeWithPleasureComponent}
              correct={correct}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              showAns={showAns}
              setStatus={setStatus}
              status={status}
              randomizer={randomizer}
              setTimerOn={setTimerOn}
              btnStatus={btnStatus}
              setBtnStatus={setBtnStatus}
            />
          </>
        ) : (
          <FinalScore
            finalScore={score}
            nickname={nickname}
            resetHandler={resetHandler}
          />
        )}
        <div className='d-flex j-content-center'>
          <Marquee
            style={{
              color: 'white',
              position: 'absolute',
              bottom: '40px',
              backgroundColor: '#fff213',
              color: 'red'
            }}
          >
            <h1>
              10,000 SRK TOKEN GRAND PRIZE | 10,000 SRK TOKEN GRAND PRIZE |
              10,000 SRK TOKEN GRAND PRIZE | 10,000 SRK TOKEN
            </h1>
          </Marquee>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps (context) {
  const questions = {
    0: [
      {
        id: 1,
        question: 'The native token of Ethereum.',
        score: 3,
        answer: 'ETH/Ether',
        choices: ['ETH/Ether', 'EHR', 'ET', 'THER']
      },
      {
        id: 2,
        question: 'Native token of Ownly.',
        score: 3,
        answer: 'OWN',
        choices: ['NLY', 'OWN', 'OWY', 'OWLY']
      },
      {
        id: 3,
        question: 'Native token ni SparkPoint.',
        score: 3,
        answer: 'SRK',
        choices: ['SRK', 'SPT', 'SPPT', 'SKT']
      },
      {
        id: 4,
        question: 'Native token of MetaGaming Guild.',
        score: 3,
        answer: 'MGG',
        choices: ['MTG', 'MEG', 'MGG', 'MGD']
      },
      {
        id: 5,
        question: 'Definition of DApps.',
        score: 3,
        answer: 'Decentralized Apps',
        choices: [
          'Developed Apps',
          'Digital Apps',
          'Decentralized Apps',
          'Dedicated Apps'
        ]
      },
      {
        id: 6,
        question: 'New game to be launched by MGG.',
        score: 3,
        answer: 'Meta Saga Warriors',
        choices: [
          'Meta Game',
          'Saga Adventures',
          'Meta Warriors',
          'Meta Saga Warriors'
        ]
      },
      {
        id: 9,
        question: 'Meaning of NFT',
        score: 3,
        answer: 'Non Fungible Token',
        choices: [
          'Non Forgettable Token',
          'Non Feasible Target',
          'Non Fungible Token',
          'No Food Today'
        ]
      },
      {
        id: 11,
        question: 'Most expensive crypto.',
        score: 3,
        answer: 'Bitcoin/BTC',
        choices: ['Ether/ETH', 'Matic', 'Bitcoin/BTC', 'SRK']
      }
    ],
    1: [
      {
        id: 0,
        question:
          'The first open-source blockchain with smart contract functionality.',
        score: 4,
        answer: 'Ethereum',
        choices: ['Bitcoin', 'Polygon', 'DApp', 'Ethereum']
      },
      {
        id: 7,
        question: 'Meaning of POS.',
        score: 4,
        answer: 'Proof of Stake',
        choices: [
          'Point of Sale',
          'Proof of Stake',
          'Percent of Statistics',
          'Person on Set'
        ]
      },
      {
        id: 8,
        question: 'Meaning of POW.',
        score: 4,
        answer: 'Proof of Work',
        choices: [
          'Proof of Work',
          'Person on Work',
          'Percentage of Work',
          'Piece of Wood'
        ]
      },
      {
        id: 10,
        question: 'Creator of Bitcoin',
        score: 4,
        answer: 'Satoshi Nakamoto',
        choices: ['Elon Musk', 'Satoshi Nakamoto', 'Michael Jordan', 'Yao Ming']
      },

      {
        id: 12,
        question: 'A decentralized digital ledger.',
        score: 4,
        answer: 'Blockchain',
        choices: ['Hardware Wallet', 'Ethereum', 'Bitcoin', 'Blockchain']
      },
      {
        id: 13,
        question: 'Physical device that stores crypto assets’ digital keys',
        score: 4,
        answer: 'Hardware Wallet',
        choices: [
          'Hardware Wallet',
          'Metamask Wallet',
          'Digital Wallet',
          'E-wallet'
        ]
      },
      {
        id: 14,
        question: 'Data structure that is used for verifying a block',
        score: 4,
        answer: 'Merkel Tree',
        choices: [
          'File Tree',
          'Merkel Tree',
          'Block Verifier',
          'Secure Block Checker'
        ]
      },
      {
        id: 15,
        question: 'Which is not a type of blockchain',
        score: 4,
        answer: 'Pi Chain',
        choices: [
          'Public Blockchain',
          'Pi Chain',
          'Consortium or Federated Blockchain',
          'Hybrid Blockchain'
        ]
      }
    ],
    2: [
      {
        id: 16,
        question:
          'Blocks in a blockchain are chained together by _____________.',
        score: 5,
        answer: 'Hash Value',
        choices: [
          'Value of Transfer',
          'Hash Value',
          'Wallet address',
          'Block explorer'
        ]
      },
      {
        id: 17,
        question:
          'Used to build smart contracts and DApps on the Ethereum blockchain.',
        score: 5,
        answer: 'Solidity',
        choices: ['C++', 'C#', 'Solidity', 'Python']
      },
      {
        id: 18,
        question:
          'Total percent of nodes that hackers should control if they want to disrupt a blockchain network.',
        score: 5,
        answer: '51%',
        choices: ['10%', '20%', '35%', '51%']
      },
      {
        id: 19,
        question: 'Meaning of DAO.',
        score: 5,
        answer: 'Distributed Autonomous Organization',
        choices: [
          'Decentralized Application Offering',
          'Digital Award Offered',
          'Distributed Autonomous Organization',
          'Distributed Automatic Organization'
        ]
      },
      {
        id: 20,
        question: 'Meaning of DEX.',
        score: 5,
        answer: 'Decentralized Exchange',
        choices: [
          'Decentralized Exchange',
          'Decentralized Extender',
          'Digital Exchange',
          'Developed Exchange'
        ]
      },
      {
        id: 21,
        question:
          'Process of depositing a cryptocurrency token or coin in a yield farming project or protocol.',
        score: 5,
        answer: 'Staking',
        choices: ['Holding', 'Buying', 'Staking', 'Burning']
      },
      {
        id: 22,
        question:
          'Type of cryptocurrency that always holds a stable price and is backed by fiat money.',
        score: 5,
        answer: 'Stable Coin',
        choices: ['Bitcoin', 'Alt Coin', 'Stable Coin', 'Ethereum']
      },
      {
        id: 23,
        question:
          'Version of the World Wide Web powered by blockchain technology.',
        score: 5,
        answer: 'Web3',
        choices: ['Web1', 'Web2', 'Web3', 'Blockchain']
      },
      {
        id: 24,
        question: 'A virtual world that exists online.',
        score: 5,
        answer: 'Metaverse',
        choices: ['Social Media', 'Metaverse', 'Blockchain', 'Ethereum Network']
      }
    ]
  }

  return {
    props: { questions }
  }
}
