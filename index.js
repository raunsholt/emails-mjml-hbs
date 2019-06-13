const Handlebars = require('handlebars');
const mjml2html = require('mjml');
const fs = require("fs");

function registerPartials () {
    var partialsDir = __dirname + '/partials';

    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
    var matches = /^([^.]+).mjml$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var partial = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    Handlebars.registerPartial(name, partial);
    });
}

function buildEmails () {
    var partialsDir = __dirname + '/partials';

    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
    var matches = /^([^.]+).mjml$/.exec(filename);
    if (!matches) {
        return;
    }
    var name = matches[1];
    var partial = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    Handlebars.registerPartial(name, partial);
    });
}

registerPartials();
buildEmails();



// Build emails
// var emailsDir = __dirname + '/emails';

// var filenames = fs.readdirSync(emailsDir);

// filenames.forEach(function (filename) {
//   var matches = /^([^.]+).mjml$/.exec(filename);
//   if (!matches) {
//     return;
//   }
//   var name = matches[1];
//   var partial = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
//   Handlebars.registerPartial(name, partial);
// });

// --- 

const fileName = 'dpd1'; 

let source = fs.readFileSync(`./emails/${fileName}.mjml`).toString();

let template = Handlebars.compile(source);

let data = {
    title: "Big title",
    dpd: fileName,
    message: "Hello wooorld",
    concept: "Folkelånet"
};

let result = template(data);

let output = mjml2html(result);


fs.writeFile(`./build/mjml/${fileName}.mjml`, result, function(err) {
    if(err) {
        return console.log(err);
    }
    });

fs.writeFile(`./build/html/${fileName}.html`, output.html, function(err) {
if(err) {
    return console.log(err);
}
});