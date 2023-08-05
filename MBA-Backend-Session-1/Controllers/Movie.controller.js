

const Movies = require("./../Models/Movies")


exports.createMovie = async (req, res) => {

    const movieObject = {
         name : req.body.name,
         description : req.body.description,
         casts : req.body.casts,
         trailerUrl : req.body.trailerUrl,
         posterUrl : req.body.posterUrl,
         language : req.body.language,
         releaseDate : req.body.releaseDate,
         director : req.body.releaseDate,
         releaseStatus : req.body.releaseStatus
    }
   try {

    if (!movieObject){
        res.send("please fill all details to add A movie in DB...").status(200)
    } else if (movieObject) {
        await Movies.create(movieObject)
         res.send("A Movies is Successfully added in DB...").status(500)
    }

   } catch (error) {
       console.log("error occured in createMovies..." + error)
       res.send("Some error occured in CreateMovies..." + error.message).status(400)
   }
    

}

exports.getAllMovies = async (req, res) => {

    const AllMovies = await Movies.find();

    try{
        if(AllMovies) {
            res.send(AllMovies).status(200);
   
       } else if(!AllMovies){
            res.send("No Movies Found In DB...").status(400)
       }

    } catch (error) {
         res.send("error occured in getAllMovies..." + error.message).status(500)
    }
    
      
}

exports.getMovieById = async (req, res) => {
      
    let givenMovieId = req.params.movieId;

    try{
        if(!givenMovieId){
            res.send("please enter a valid movieId for search a movie...").status(201)
            return;
        } else {
            let findMovie = await Movies.find({ _id : givenMovieId})
            if(!findMovie){
                res.send('No Movie Found In DB with given movieId...').status(201)
            } else if(findMovie){
                res.send(findMovie).status(200)
            }
        }

    } catch (error) {
         res.send("some error occured in find Movies By Id..." + error.message).status(400)
    }
    

    

}

exports.updateMovie = async (req, res) => {

}

exports.deleteMovie = async (req, res) => {

   
    
}
