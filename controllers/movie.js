const router = require('express').Router()
const Movie = require('../models/movie')
const movieSeedData = require('../models/movieSeedData.js')

router.get('/data/seed', async (req,res) =>{
    await Movie.insertMany(movieSeedData)
    res.redirect('/movies')
})

router.get('/', async (req, res)=>{
    const movies = await Movie.find()
    res.render('movies/index', {movies})
})

router.get('/new', (req, res) => {
    res.render('movies/new')
})

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params
    const movie = await Movie.findOne({ title: name })
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
      .then((movie) => {
        res.render("movies/show", { movie })
      })
      .catch((err) => {
        res.render("error404")
      })
  })

router.post('/', async(req, res) => {
    await Movie.create(req.body)
    .then(() => {
      res.redirect('movies')
    })
    .catch(err => {
      console.log('err', err)
      res.render('error404')
    })
  })

router.put('/:name', async(req,res)=>{
  const { name } = req.params
  try{
    const updatedMovie = await Movie.findOneAndUpdate({ title: name }, req.body)
    if(!updatedMovie){
      return res.status(404).json({ error:'movie not found' })
    }
    res.status(200).json(updatedMovie)
  }catch(err){
    res.status(500).json(err)
  }
  console.log('hello')
})

router.delete('/:name', async (req, res) => {
  const { name } = req.params
  try {
    const deletedMovie = await Movie.findOneAndDelete({ title: name })
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    res.status(200).json({ message: 'Movie deleted successfully' })
  } catch (err) {
    console.error('Error:', err)
    res.status(500).json(err)
  }




module.exports = router