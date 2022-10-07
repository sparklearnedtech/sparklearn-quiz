import fs from 'fs'

export default async function handler (req, res) {
  function savePlayer () {
    const d = new Date()
    fs.appendFile(
      'appdata.csv',
      `${d.getTime()}, chan, c.salvadora@sparklearn-edtech.com, 12\n`,
      err => {
        if (err) {
          console.log(err)
        } else
          [
            console.log(
              `${d.getTime()}. chan, c.salvadora@sparklearn-edtech.com, 12`
            )
          ]
      }
    )
  }
  savePlayer()
  res.status(200).end()
}
