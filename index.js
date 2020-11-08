const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();
const port = 3000;
const readFile = util.promisify(fs.readFile);

app.use(express.static('src'));

async function getHeader() {
    return readFile('./src/layout/header.html', 'utf8');
}

async function getFooter() {
    return readFile('./src/layout/footer.html', 'utf8');
}

async function getPage(pageName) {
    return readFile(`./src/pages/${pageName}.html`, 'utf8');
}

async function getFullPageMarkup(pageName) {
    const header = await getHeader();
    const footer = await getFooter();
    const page = await getPage(pageName);

    const html = `
        <!DOCTYPE html>
        <html>
            <link rel="stylesheet" href="../styles/index.css"> 
            <body>
                ${header}
                ${page}
                ${footer}
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
            </body>
        </html>
    `;

    return html;
}

// app.use(express.static('src'));

app.get('/blog_1', async (req, res) => {
    const html = await getFullPageMarkup('blog_1');

    res.send(html);
});

app.get('/', async (req, res) => {
    const html = await getFullPageMarkup('main');

    res.send(html);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});