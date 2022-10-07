import fs from 'fs'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { nickname, email, score } = JSON.parse(req.body)
    console.log(req.body)
    const d = new Date()
    fs.appendFile(
      'appdata.csv',
      `${d.getTime()}, ${nickname}, ${email}, ${score}\n`,
      err => {
        if (err) {
          console.log(err)
        } else console.log(`${d.getTime()}, ${nickname}, ${email}, ${score}`)
      }
    )
  }
  res.status(200).end()
}
