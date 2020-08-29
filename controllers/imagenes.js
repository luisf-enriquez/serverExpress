const fs = require('fs');
const path = require('path');

module.exports.getImage = (res, data) => {
    try {
        let pathImg = path.resolve(__dirname, `../uploads/${data.tipo}/${data.img}`);
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else {
            const absoluteNoImg = path.resolve(__dirname, '../assets/no-image.jpg');
            res.sendFile(absoluteNoImg); 
        }
    } catch (error) {
        console.log(error)
    }
};