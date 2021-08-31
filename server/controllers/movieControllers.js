

// FOR LANDING PAGE - after login:
// **************************************
// GET upcoming movies - limited to 10
exports.upcomingMovies = async (req, res) => {
    res.status(200).json({message: "connected to Upcoming movies"})
}

// GET movies by genre and by user id - limited to 10
exports.moviesByUserGenre = async (req, res) => {
    res.status(200).json({message: "connected to moviesByUserGenre movies"})
}


// FOR SEARCH:
// **************************************
// GET movies by title
exports.moviesByTitle = async (req, res) => {
    res.status(200).json({message: "connected to moviesByTitle"})
}

// GET movies by director
exports.moviesByDirector = async (req, res) => {
    res.status(200).json({message: "connected to moviesByDirector"})
}

// GET movies by genre
exports.moviesByGenre = async (req, res) => {
    res.status(200).json({message: "connected to moviesByGenre"})
}

// GET movies by year
exports.moviesByYear = async (req, res) => {
    res.status(200).json({message: "connected to moviesByYear"})
}


// FOR INDIVIDUAL MOVIE:
// **************************************

exports.moviesById = async (req, res) => {
    res.status(200).json({message: "connected to moviesById"})
}