const movieController = require('../Controllers/Movie.controller')

module.exports = function (app) {
  app.get('/movieBooking/api/v1/movies', movieController.getAllMovies)
  app.get('/movieBooking/api/v1/movies/:movieId', movieController.getMovieById)
  app.post('/movieBooking/api/v1/movies', movieController.createMovie)
  app.put('/movieBooking/api/v1/movies/:id', movieController.updateMovie)
  app.delete('/movieBooking/api/v1/movies/:id', movieController.deleteMovie)
}
