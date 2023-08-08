


const theatreController = require("../Controllers/Theatre.controlelr");

module.exports = function (app) {
    app.get("/MovieBooking/api/v1/theatres", theatreController.getAllTheatres);
    // app.get("/MovieBooking/api/v1/theatres/:theatreId", theatreController.getTheatre);
    app.get("/MovieBooking/api/v1/alltheatres" , theatreController.AllTheatres)
    app.get("/MovieBooking/api/v1/MoviesInTheatre/:theatreName/:movieId" , theatreController.getMoviesInTheatre)
    app.post("/MovieBooking/api/v1/theatres", theatreController.addTheatre);
    app.put("/MovieBooking/api/v1/theatres/:theatreId", theatreController.updateTheatre);
    app.delete("/MovieBooking/api/v1/theatres/:theatreId", theatreController.deleteTheatre);
    app.delete("/MovieBooking/api/v1/theatres/deleteMovie/:theatreId/:movieId", theatreController.removeMoviesFromTheatre);
    app.put("/MovieBooking/api/v1/addMovieInTheatre/:theatreId" , theatreController.addMoviesInTheatreTwo)
}