import express from 'express'
import spa from 'express-spa'
import { resolve } from 'path'
import { webpackHot, webpackDev } from './middleware/webpack'

const app = express()
app.disable('x-powered-by')
// app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

app.use(webpackDev)
app.use(webpackHot)

app.use(express.static(resolve(__dirname, '../pub')))
app.use(spa(resolve(__dirname, '../pub/index.html')))

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`server running at http://localhost:${server.address().port}`)
})
