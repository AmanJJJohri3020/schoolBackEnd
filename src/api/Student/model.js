import mongoose, { Schema } from 'mongoose'

const studentSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

studentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Student', studentSchema)

export const schema = model.schema
export default model
