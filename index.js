const Handlebars = require('handlebars');
const mjml2html = require('mjml');
const fs = require("fs");

let currDate = new Date();
let fullYear = currDate.getFullYear();

let globalData = {
            company: "Lendomatic",
            phone: "+45 71 70 10 60",
            bankaccount: "7134 - 0001042621",
            bankaccountText: "Reg. nr.: 7134 Konto nr.: 0001042621",
            year: fullYear
};

let conceptData = {
    "concepts":
    [
        {            
            "concept": "folkelaanet",
            "conceptName": "Folkelånet",
            "email": "kontakt@folkelaanet.dk",
            "url": "https://folkelaanet.dk/",
            "loginUrl": "https://app.folkelaanet.dk/login",
            "banner": "https://minifinans.dk/wp-content/uploads/2019/02/folkelaan_logo.png",
        },        
        {
            "concept": "kassekreditten",
            "conceptName": "Kassekreditten",
            "email": "kontakt@kassekreditten.dk",
            "url": "https://kassekreditten.dk/",
            "loginUrl": "https://app.kassekreditten.dk/login",
            "banner": "https://kassekreditten.dk/wp-content/uploads/optimised-1.svg",
        }
    ],
};

// HELPERS START
function registerHelpers() {
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
}

registerHelpers();
// HELPERS END

// PARTIALS START
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

registerPartials();
// PARTIALS END

// CREATE FOLDERS START

function createFolders() {

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

    fs.mkdir(`build/mjml/${conceptData.concepts[item].concept}`, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.mkdir(`build/html/${conceptData.concepts[item].concept}`, function (err) {
        if (err) {
            return console.log(err);
        }
    });

}
// CREATE FOLDERS END

// BUILD START
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
// BUILD END

// RUN START (change to forEach?)

for(var item in conceptData.concepts) {
    createFolders();
    buildEmails(conceptData.concepts[item]);
  }

// RUN END