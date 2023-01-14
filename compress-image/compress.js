const sharp = require('sharp');
const path = require('path');
const src = '../public/services/convert/';
const saveTo = '../public/services/';
const pathInfo = path.resolve(__dirname,src);
const fs = require('fs');

//emoji
// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//         sharp(path.resolve(__dirname,src+file)).toFormat('webp').webp({ quality: 100 }).resize({width:120,height:120}).toFile(path.resolve(__dirname,saveTo+path.parse(file).name+'.webp'));
//     });
// });
//app icon
fs.readdir(pathInfo, (err, files) => {
    files.forEach(file => {
        sharp(path.resolve(__dirname,src+file)).toFormat('webp').webp({ quality: 100 }).resize({width:800,height:800}).toFile(path.resolve(__dirname,saveTo+path.parse(file).name+'.webp'));
    });
});


// const name = 'bar_chart.webp';
// const name2 = 'briefcase.webp';

// sharp(path.resolve(__dirname,'../public/emoji/'+name)).toFormat('webp').webp({ quality: 100 }).resize(60,60).toFile(path.resolve(__dirname,'../public/emoji-small/'+name));
