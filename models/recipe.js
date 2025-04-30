const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

console.log('BE: connecting to', url)
mongoose
    .connect(url)
    .then(result => {
    console.log('BE: connected to MongoDB')
  })
  .catch((error) => {
    console.log('BE: error connecting to MongoDB:', error.message)
  })

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  recipe: String,
  ingredients: String,
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)