const Handlebars = require('handlebars');
const mjml2html = require('mjml');
const fs = require("fs");
const conceptData = require('./conceptdata.json');

// Get current year
let currDate = new Date();
let fullYear = currDate.getFullYear();

// DATA OBJECTS
// Data that apply to all concepts
let globalData = {
            company: "Lendomatic",
            phone: "+45 71 70 10 60",
            bankaccount: "7134 - 0001042621",
            bankaccountText: "Reg. nr.: 7134 Konto nr.: 0001042621",
            year: fullYear
};

// HELPERS 
// Used to add styling to each concept in "styling-concepts.mjml"
function registerHelpers() {
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
}

// PARTIALS 
// Register every .mjml file in the folder "partials" 
function registerPartials() {
    let partialsDir = __dirname + '/partials';

    let filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function (filename) {
        let matches = /^([^.]+).mjml$/.exec(filename);
        if (!matches) {
            return;
        }
        let name = matches[1];
        let partial = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        Handlebars.registerPartial(name, partial);
    });
}

// CREATE FOLDERS
// Create main folders if doesn't exist
function createMainFolders() {

    fs.mkdir("build", function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.mkdir("build/html", function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.mkdir("build/mjml", function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// Create folders for each concept if doesn't exist
function createConceptFolders(concept) {

    fs.mkdir(`build/mjml/${concept}`, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.mkdir(`build/html/${concept}`, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// BUILD 
function buildEmails(data) {
    let emailsDir = __dirname + '/emails';

    let filenames = fs.readdirSync(emailsDir);

    filenames.forEach(function (filename) {
        let matches = /^([^.]+).mjml$/.exec(filename);
        if (!matches) {
            return;
        }
        let name = matches[1];
        let source = fs.readFileSync(`./emails/${name}.mjml`).toString();

        let template = Handlebars.compile(source);

        Object.assign(data, globalData);

        let result = template(data);

        let output = mjml2html(result);

        fs.writeFile(`./build/mjml/${conceptData.concepts[item].concept}/${name}-${conceptData.concepts[item].concept}.mjml`, result, function (err) {
            if (err) {
                return console.log(err);
            }
        });

        fs.writeFile(`./build/html/${conceptData.concepts[item].concept}/${name}-${conceptData.concepts[item].concept}.html`, output.html, function (err) {
            if (err) {
                return console.log(err);
            }
        });

    });
}

// RUN 
registerHelpers();
registerPartials();
createMainFolders();

for(var item in conceptData.concepts) {
    createConceptFolders(conceptData.concepts[item].concept)
    // console.log(conceptData.concepts[item].concept)
  }

for(var item in conceptData.concepts) {
    buildEmails(conceptData.concepts[item]);
    // console.log(conceptData.concepts[item].concept)
  }