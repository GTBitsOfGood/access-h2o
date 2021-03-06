import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const CompanySchema = new Schema({
  accountId: {
    type: ObjectId,
    required: false,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
})

export default mongoose.models.Company ??
  mongoose.model('Company', CompanySchema)
