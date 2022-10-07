import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>SparkLearn EdTech Quiz</title>
        <meta name='description' content='Quiz for SparkLearn EdTech Booth' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}
