import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      unique: true,
      required: true
    },
    file: {
      type: {
        a: {
          type: Number,
          required: true
        },
        b: {
          type: Number,
          required: true
        },
        operator: {
          type: String,
          required: true
        },
        result: {
          type: String,
          required: true
        }
      },
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Storage = mongoose.model('Storage', schema)

export default Storage
