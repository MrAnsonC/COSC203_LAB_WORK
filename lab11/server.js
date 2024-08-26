const express = require('express');
const path = require('path');
const birds_router = require('./birds_router');
const PORT = 8080;
const app = express();
const bodyParser = require('body-parser');


//Bird
app.use('/birds/', birds_router);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))

/*
app.get('/home', (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html')
    response.sendFile(filePath);
});

app.get('/default.html', (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html')
    response.sendFile(filePath);
});

app.get('/index.html', (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html')
    response.sendFile(filePath);
});

app.get('/home.html', (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html')
    response.sendFile(filePath);
});
*/

app.get('/time', (request, response) => {
    const datetime = new Date().toISOString();

    const dynamic_html = `<h1>The server time is ${datetime}</h1>`

    response.send(dynamic_html);
});

app.post('/submit_login', (request, response) => {
    const user = request.body.user;
    const pass = request.body.pass;

    // in practice, we would check a database for the username/password
    if (user === "admin" && pass === "password123") {
        // if login matches, load success.html
        response.redirect('success.html');
    } else {
        // if login fails, load login.html
        response.redirect('login.html');
    }
})

app.get('*', (request, response) => {
    response.status(404)
    response.sendFile(path.resolve(__dirname, 'public/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is live! on port http://localhost:${PORT}`)
});