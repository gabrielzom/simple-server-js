import express from 'express'
import cors from 'cors'
import { executeScript, connectToDatabase } from './database.js'
import { config } from 'dotenv'
config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.listen(process.env.PORT || 8080, () => console.log(`App listen in port: http://localhost:8080`))

const executeRequest = (req, res) => {
  const scriptsObjectPayload = req.body
  const scriptsList = Object
    .keys(scriptsObjectPayload)
    .map(script => scriptsObjectPayload[script])
  if (['/start-trip', '/end-trip', '/make-payment']
      .includes(req.path)
    ) {
    return Promise.all(scriptsList.map(script => executeScript(script)))
      .then(result => res.status(200).json({
        rows: result[result.length-1][0],
        columns: result[result.length-1][1],
      }))
  }
  Promise.all(scriptsList.map(script => executeScript(script)))
    .then(result =>
      res.status(200).json({rows: result[0][0], columns: result[0][1]})
    )
    .catch(error =>
      res.status(500).json(error)
    )
}

app.route('/client').post((req, res) => executeRequest(req, res))
app.route('/trip').post((req, res) => executeRequest(req, res))
app.route('/park').post((req, res) => executeRequest(req, res))
app.route('/vehicle-able').post((req, res) => executeRequest(req, res))
app.route('/vehicle-able-by-park').post((req, res) => executeRequest(req, res))
app.route('/start-trip').post((req, res) => executeRequest(req, res))
app.route('/end-trip').post((req, res) => executeRequest(req, res))
app.route('/make-payment').post((req, res) => executeRequest(req, res))
