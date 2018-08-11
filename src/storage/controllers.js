import Storage from '../models/storage'

const storage = {
  async create (request, h) {
    try {
      const newClient = new Storage({ client_id: request.payload.client_id, file: request.payload.file })

      await newClient.save()

      return h.response({ success: true, message: 'created' }).code(201)
    } catch (error) {
      if (error.code === 11000) {
        return h
          .response({
            success: false,
            message: 'client_id already exists'
          })
          .code(202)
      }

      return h.response({ success: false, message: error.message }).code(500)
    }
  },
  async remove (request, h) {
    try {
      const result = await Storage.findOne({ client_id: request.params.id })

      if (result) {
        await Storage.findOneAndRemove({ client_id: request.params.id })

        return h.response({ success: true, message: 'removed' }).code(200)
      }

      return h.response({ success: true, message: 'not found' }).code(202)
    } catch (error) {
      return h.response({ success: false, message: error.message }).code(500)
    }
  },
  async find (request, h) {
    try {
      const result = await Storage.findOne({ client_id: request.params.id })

      if (result) {
        return h.response(result.file).code(200)
      } else {
        return h.response({ success: true, message: 'not found' }).code(200)
      }
    } catch (error) {
      return h.response({ success: true, message: error.message }).code(500)
    }
  },
  async update (request, h) {
    try {
      const result = await Storage.findOne({ client_id: request.params.id })

      if (result) {
        await Storage.findOneAndUpdate(
          { client_id: request.params.id },
          { file: request.payload.file }
        )

        return h.response({ success: true, message: 'updated' }).code(200)
      }

      return h.response({ success: true, message: 'not found' }).code(202)
    } catch (error) {
      return h.response({ success: false, message: error.message }).code(500)
    }
  }
}

export default storage
