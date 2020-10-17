const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use('/user', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/views/forbidden.html'));
});

app.get('/public/404.png', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.png'));
});

app.get('/', (req, res) => {
    res.show('home.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '/views/404.html'));
})

app.listen(8080, () => {
    console.log('Server is running on port: 8080');
});