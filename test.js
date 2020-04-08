const fs = require('fs');
const imageList = fs.readdirSync('./src/images/display-pictures/Baskets');
const newImgList = imageList.map((image) => {
    image = image.slice(0, -4)
    return image = image.split(',')
})

console.log(newImgList)