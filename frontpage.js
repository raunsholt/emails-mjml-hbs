// var cars = ["BMW", "Volvo", "Saab", "Ford"];
// var i = 2;
// var len = cars.length;
// var text = "";

// for (; i < len; i++) {
//   text += cars[i] + "<br>";
// }

// document.getElementById("demo").innerHTML = text;

const fs = require("fs");

function logFiles() {
    const testFolder = './build/html/';

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(file);
            return file;
        });
    });
}

logFiles();

