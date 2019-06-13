const Handlebars = require('handlebars');
const mjml2html = require('mjml');
const fs = require("fs");

function registerPartials () {
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

function buildEmails () {
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

        let data = {
            title: "Big title",
            dpd: name,
            message: "Hello wooorld",
            concept: "Folkelånet"
        };

        let result = template(data);

        let output = mjml2html(result);

        fs.writeFile(`./build/mjml/${name}.mjml`, result, function(err) {
            if(err) {
                return console.log(err);
            }
            });
        
        fs.writeFile(`./build/html/${name}.html`, output.html, function(err) {
        if(err) {
            return console.log(err);
        }
        });

            });
}

registerPartials();
buildEmails();