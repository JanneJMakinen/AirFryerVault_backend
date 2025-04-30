
// Air Fryer Vault Application 2025 Janne J. Mäkinen
// backend

// TODO
// TODO (front and back)
// add functionality for recipe edit, add, remove
// limit of showing recipes
// better looking card
// search functionality
// add more requests for testing

// ADDED
// requests were missing next

require('dotenv').config()  // remember to config .env and .gitignore 
const express = require('express')
const Recipe = require('./models/recipe')
const app = express()
app.use(express.static('dist'))
app.use(express.json())         // use this so we can get later body = request.body

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

// uses mongo with error middleware
// get all recipes
app.get('/api/recipes', (request, response, next) => {
    console.log('BE: app.get()')
    Recipe.find({}).then(recipes => {
        response.json(recipes)
    })
    .catch(error => next(error))
})

// uses mongo with error middleware
// add a recipe
app.post('/api/recipes', (request, response, next) => {
    console.log('BE: app.post()')
    
    // check done via schema required
    //const body = request.body
    // if (!body.name) {
    //   return response.status(400).json({ error: 'recipe name missing!' })
    // }
    const recipe = new Recipe({
        name: body.name,
        recipe: body.recipe,
        ingredients: body.ingredients
    })
    recipe.save().then(savedRecipe => {
        response.json(savedRecipe)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'BE: unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`BE: Server running on port ${PORT}`)
})








