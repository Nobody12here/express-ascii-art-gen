const jimp = require('jimp');

// Define a custom character set with varying density
const density = "@%#*+=-:. ";

function map(pixel, toLower, toUpper) {
    const range = toUpper - toLower;
    const step = range / density.length;
    const index = Math.floor((pixel - toLower) / step);
    return index;
}

async function generate_ascii_art(imageData) {
    let img;
    let string = "";

    try {
        img = await jimp.read( imageData);
    } catch (error) {
        console.error(error.message)
        return "";
    }

    const width = img.bitmap.width;
    const height = img.bitmap.height;

    img = img.greyscale();

    for (let y = 0; y < height; y++) {
        string +='\n'
        for (let x = 0; x < width; x++) {
            const reverseDenisty = density.split("").reverse().join("")
            let hex = img.getPixelColor(x, y);
            const pixel = jimp.intToRGBA(hex).r;
            const index = map(pixel, 0, 255);
            string += reverseDenisty[index];
        }
    }
    return string;
}

module.exports = generate_ascii_art;