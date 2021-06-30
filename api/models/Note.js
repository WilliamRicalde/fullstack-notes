const { model, Schema } = require('mongoose')

const noteSchema = new Schema({
  title: String,
  content: {
    type: String,
    required: true
  }
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
