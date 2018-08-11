import mongoose from 'mongoose'

export default {
  connect (DB_URI) {
    mongoose.connect(DB_URI)

    mongoose.connection.on('error', e => {
      console.error('Mongoose can not open connection')
      console.error(e)
      process.exit()
    })

    mongoose.connection.on('connected', () => {
      console.log('Connection DB ok')
    })

    mongoose.connection.on('disconnected', () => {
      console.error('Connection DB lost')

      setTimeout(() => {
        mongoose.connect(DB_URI)
        console.error('DB reconnection')
      }, 15000)
    })
  }
}
