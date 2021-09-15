
const randomizeColor = () => {
    let randomColor = "#";
    for (let i = 0; i < 3; i++)
        randomColor += (
            "0" +
            Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
        ).slice(-2);

    return randomColor
};

// console.log(randomizeColor());

module.exports = {
    randomizeColor
}