// var cars = ["BMW", "Volvo", "Saab", "Ford"];
// var i = 2;
// var len = cars.length;
// var text = "";

// for (; i < len; i++) {
//   text += cars[i] + "<br>";
// }

// document.getElementById("demo").innerHTML = text;

// const fs = require("fs");

// function logFiles() {
//     const testFolder = './build/html/';

//     fs.readdir(testFolder, (err, files) => {
//         files.forEach(file => {
//             console.log(file);
//             return file;
//         });
//     });
// }

// logFiles();

 

    function getFiles() {
    //requiring path and fs modules
        const path = require('path');
        const fs = require('fs');
        //joining path of directory 
        const directoryPath = path.join(__dirname, 'build/html/folkelaanet');
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
                // let h = document.createElement("H1");
                // let t = document.createTextNode("Hello World");
                // h.appendChild(t);
                // document.body.appendChild(h);
            });
        });
    };

    getFiles();