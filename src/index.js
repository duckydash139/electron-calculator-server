import Hapi from 'hapi'
import Inert from 'inert'
import Vision from 'vision'
import HapiSwagger from 'hapi-swagger'
import dotenv from 'dotenv'

import db from './utils/database'
import routes from '../src/storage/routes'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.dev.env' })
} else {
  dotenv.config({ path: '.prod.env' })
}

const server = Hapi.server({
  host: process.env.HOST,
  port: process.env.PORT
})

const swaggerOptions = {
  info: {
    title: 'electron-calculator-server'
  },
  jsonEditor: true
}

const init = async () => {
  db.connect(process.env.DATABASE_URI)

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  routes.map(route => {
    server.route(route)
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
