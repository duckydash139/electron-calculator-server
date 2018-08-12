import Hapi from 'hapi'
import dotenv from 'dotenv'

import db from '../src/utils/database'
import routes from '../src/storage/routes'

dotenv.config({ path: '.dev.env' })

const server = Hapi.server({
  host: process.env.HOST,
  port: process.env.PORT
})

db.connect(`${process.env.DATABASE_URI}-test`)

routes.map(route => {
  server.route(route)
})

export default server
