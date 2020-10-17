const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/user', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '/views/forbidden.html'));
// });

// app.get('/public/404.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/404.png'));
// });

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, '/views/404.html'));
// })

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.post('/contact/send-message', (req, res) => {

    const { author, sender, title, message } = req.body;

    if (author && sender && title && message) {
        res.render('contact', { isSent: true });
    }
    else {
        res.render('contact', { isError: true });
    }

});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8080, () => {
    console.log('Server is running on port: 8080');
});