
exports.paginationHelper = async (req, res, numberOfMovies) => {

    // console.log(req.params.page, numberOfMovies );  // gives undefined for numberOfMovies
    const page = req.params.page - 1
    const numberOfPages = Math.ceil(numberOfMovies / 10)

    let start, end

    if (page >= 0 && page < numberOfPages) {
        start = 10 * page
        end = 10 + start
    }
    else {
        console.log("test");
        // res.status(500).json({ message: "No such page found" })
    }

    return start, end, numberOfPages
}